import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';

// localhost:4200/heroes/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent, // Mirar que importa ./pages/layout-page el de heroes
    children: [
      { path: 'new-hero', component: NewPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
