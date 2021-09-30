import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NeedLoginGuard implements CanActivate {
  constructor(
    private aus: AuthService,
    private router: Router,
    private sb: MatSnackBar,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = this.aus.isLogin();
    if (!isLogin) {
      this.sb.open('You must login to Misskey instance');
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/']);
    }
    return isLogin;
  }

}
