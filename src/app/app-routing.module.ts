import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NeedLoginGuard } from "./guard/need-login.guard";
import { NotLoginGuard } from "./guard/not-login.guard";
import { NeedAdminGuard } from "./guard/need-admin.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule),
    canActivate: [NotLoginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [NeedLoginGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [NeedLoginGuard, NeedAdminGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    canActivate: [NeedLoginGuard],
  },
  {
    path: 'files',
    loadChildren: () => import('./pages/files/files.module').then(m => m.FilesModule),
    canActivate: [NeedLoginGuard],
  },
  {
    path: 'federation',
    loadChildren: () => import('./pages/federation/federation.module').then(m => m.FederationModule),
    canActivate: [NeedLoginGuard],
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule),
    canActivate: [NeedLoginGuard],
  },
  {
    path: 'emoji',
    loadChildren: () => import('./pages/emoji/emoji.module').then(m => m.EmojiModule),
    canActivate: [NeedLoginGuard],
  },
  {
    path: 'callback',
    loadChildren: () => import('./pages/callback/callback.module').then(m => m.CallbackModule),
    canActivate: [NotLoginGuard],
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
