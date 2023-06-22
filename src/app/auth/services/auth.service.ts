import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap } from 'rxjs';

import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl; // Que coja el environments no el de environments.prod
  private user?: User; // Declarar como privado para que no se pueda acceder directamente desde fuera de este servicio

  constructor(private http: HttpClient) { }

  get currentUser(): User|undefined {
    if ( !this.user ) return undefined;

    // return { ...this.user }; // Para evitar el paso por referencia, lo hacemos por operador spread y ya lo tenemos por valor.
                                // Lo malo es que no se debe usar si tiene muchas estructuras anidadas.

    return structuredClone( this.user ); // Más nuevo, da igual si tiene propiedades o métodos o estructuras anidadas

  }

  login( email: string, password: string ):Observable<User> {

    // http.post('login', { email, password })

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user ),
        tap( user => localStorage.setItem('token', 'asasdkl.asdlasld.asdlksaldd' ) ),
      );

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }

}
