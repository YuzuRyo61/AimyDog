import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NeedLoginGuard} from "./guard/need-login.guard";
import {NotLoginGuard} from "./guard/not-login.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule),
    canActivate: [NotLoginGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate: [NeedLoginGuard],
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
