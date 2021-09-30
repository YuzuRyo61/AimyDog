import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NotLoginGuard implements CanActivate {
  constructor(
    private aus: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLogin = this.aus.isLogin();
    if (isLogin) {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/dashboard']);
    }
    return !isLogin;
  }

}
