import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as semver from 'semver';
import { v4 as uuidv4 } from 'uuid';
import { MiAuthResponse } from "../interface/mi-auth-response";
import { environment } from "../../environments/environment";
import { User } from "../interface/user";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MkMeta } from "../interface/mk-meta";
import { APP_BASE_HREF } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _protocol: 'http:' | 'https:' = 'https:';
  private _address?: string;
  private _token?: string;
  private _credentials?: User;

  constructor(
    private cs: CookieService,
    private hc: HttpClient,
    private router: Router,
    private sb: MatSnackBar,
    @Inject(APP_BASE_HREF) private abh: string,
  ) { }

  get protocol(): 'http:' | 'https:' {
    return this._protocol;
  }

  set protocol(val: 'http:' | 'https:') {
    this._protocol = val;
  }

  get address(): string | undefined {
    return this._address;
  }

  get token(): string | undefined {
    return this._token;
  }

  isLogin(): boolean {
    return this._token !== undefined && this._address !== undefined;
  }

  get credentials(): User | undefined {
    return this._credentials;
  }

  onInit(): void {
    this.getProtocolCookie();
    const cookieToken = this.cs.get('mk_token');
    this._token = cookieToken !== '' ? cookieToken : undefined;
    const address = this.cs.get('mk_address');
    this._address = address !== '' ? address : undefined;
    if (this._token !== undefined) this.getCredentials();
  }

  private getCredentials(): void {
    this.hc.post(`${this._protocol}//${this._address}/api/i`, { i: this._token }).toPromise().then(res => {
      this._credentials = res as User;
    }).catch(err => {
      console.error(err);
      this.sb.open($localize`:@@common.bad_credentials:Cannot fetch your credentials.`);
    });
  }

  isAvailableInstance(address: string) : Promise<boolean> {
    return this.hc.post(`${this._protocol}//${address}/api/meta`, {}).toPromise().then(
      (valObj) => {
        const val = valObj as MkMeta;
        return semver.gte(val.version, '12.39.1');
      }
    ).catch(
      (reason) => {
        console.error(reason);
        return false;
      }
    );
  }

  setProtocolCookie(): void {
    this.cs.set('mk_protocol', this._protocol, {
      secure: environment.production,
      path: '/',
      sameSite: 'Strict',
    });
  }

  private getProtocolCookie(): void {
    const protocol = this.cs.get('mk_protocol');
    if (protocol !== 'http:' && protocol !== 'https:') return;
    if (protocol !== this._protocol) this._protocol = protocol;
  }

  generateMiAuthUrl(address: string): string {
    const authQuery = new URLSearchParams({
      name: 'AimyDog',
      callback: `${window.location.protocol}//${window.location.host}${this.abh.replace(/\/$/i, '')}` + this.router.createUrlTree(['/callback', address]),
    });
    const sessionId = uuidv4();

    return `${this._protocol}//${address}/miauth/${sessionId}?${authQuery.toString()}`;
  }

  async callbackProcess(address: string, sessionId: string): Promise<boolean | undefined> {
    if (this._token !== undefined || this._address !== undefined) {
      return undefined;
    }
    return this.hc.post(`${this._protocol}//${address}/api/miauth/${sessionId}/check`, {}).toPromise().then(dataRaw => {
      const data = dataRaw as MiAuthResponse;
      if (!data.ok || data.token === undefined || !(data.user?.isAdmin || data.user?.isModerator)) {
        return false;
      }

      this.cs.set('mk_token', data.token, {
        secure: environment.production,
        path: '/',
        sameSite: 'Strict',
      });
      this._token = data.token;
      this.cs.set('mk_address', address, {
        secure: environment.production,
        path: '/',
        sameSite: 'Strict',
      });
      this._address = address;
      this.getCredentials();

      return true;
    }).catch(err => {
      console.error(err);
      return false;
    });
  }

  destroySession(): void {
    this.cs.deleteAll();
    this._token = undefined;
    this._address = undefined;
    this._credentials = undefined;
    this.router.navigate(['/']).then(() => {
      this.sb.open($localize`:@@common.logout:You have been logout.`);
    });
  }
}
