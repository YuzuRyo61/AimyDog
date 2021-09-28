import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as semver from 'semver';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private protocol = 'https';
  private _token?: string;

  constructor(
    private cs: CookieService,
    private hc: HttpClient,
  ) { }

  get token(): string | undefined {
    return this._token;
  }

  get isLogin(): boolean {
    return this._token !== undefined;
  }

  onInit(): void {
    const cookieToken = this.cs.get('mk_token');
    this._token = cookieToken !== '' ? cookieToken : undefined;
  }

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

  generateMiAuthUrl(address: string): string {
    const authQuery = new URLSearchParams({
      name: 'Mikan',
      callback: `${window.location.protocol}://${window.location.host}/callback/${address}`,
    });
    const sessionId = uuidv4();

    return `${this.protocol}://${address}/miauth/${sessionId}?${authQuery.toString()}`;
  }

  callbackProcess(address: string, sessionId: string): boolean {
    return false;
  }

}
