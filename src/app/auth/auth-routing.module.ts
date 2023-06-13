import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

// localhost:4200/auth/
const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent // Mirar que importa ./pages/layout-page el de auth
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
