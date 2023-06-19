import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable: true }),
    publisher:        new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', value: 'DC - Comics' },
    { id: 'Marvel Comics', value: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {

    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
      ).subscribe ( hero => {

        if ( !hero ) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset( hero );

        return;

      });
  }


  onSubmit():void {

    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackBar(`${ hero.superhero } updated!`);
        });

      return;
    }

    // Si llega hasta aqui es que no tenemos id y entonces queremos crear
    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        // TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id

        this.router.navigate(['/heroes/edit', hero.id ]);
        this.showSnackBar(`${ hero.superhero } created!`);

      })

    // this.heroesService.updateHero( this.heroForm.value ) --> No es válido, no es exactamente lo que espera

  }


  onDeleteHero() {
    if ( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log({ result });

      if ( !result ) return;

      this.heroesService.deleteHeroById( this.currentHero.id );
      this.router.navigate(['/heroes'])
    });


  }

  showSnackBar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }
}
