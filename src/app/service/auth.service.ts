import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as semver from 'semver';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private protocol = 'https';

  constructor(
    private cs: CookieService,
    private hc: HttpClient,
  ) { }

  isAvailableInstance(address: string) : Promise<boolean> {
    return this.hc.post(`${this.protocol}://${address}/api/meta`, {}).toPromise().then(
      (valObj) => {
        const val = valObj as any;
        return semver.satisfies(val.version, '>=12.39.1');
      },
      (reason) => {
        console.error(reason);
        return false;
      }
    );
  }
}
