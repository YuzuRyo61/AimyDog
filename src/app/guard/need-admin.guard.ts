import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NeedAdminGuard implements CanActivate {
  constructor(
    private aus: AuthService,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = (this.aus.credentials === undefined) ? false : this.aus.credentials.isAdmin;
    if (!result) {
      // noinspection JSIgnoredPromiseFromCall
      this.router.navigate(['/dashboard']);
    }
    return result;
  }

}
