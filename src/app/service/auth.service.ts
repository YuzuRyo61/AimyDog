import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as semver from 'semver';
import { v4 as uuidv4 } from 'uuid';
import {MiAuthResponse} from "../interface/mi-auth-response";
import {environment} from "../../environments/environment";
import {User} from "../interface/user";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _protocol = 'http';
  private _address?: string;
  private _token?: string;
  private _credentials?: User;

  constructor(
    private cs: CookieService,
    private hc: HttpClient,
    private router: Router,
    private sb: MatSnackBar,
  ) { }

  get protocol(): string {
    return this._protocol;
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
    const cookieToken = this.cs.get('mk_token');
    this._token = cookieToken !== '' ? cookieToken : undefined;
    const address = this.cs.get('mk_address');
    this._address = address !== '' ? address : undefined;
    if (this._token !== undefined) this.getCredentials();
  }

  private getCredentials(): void {
    this.hc.post(`${this._protocol}://${this._address}/api/i`, {i: this._token}).toPromise().then(res => {
      this._credentials = res as User;
    }).catch(err => {
      console.error(err);
      this.sb.open('Cannot fetch your credentials.', undefined, {
        duration: 5000,
      })
    });
  }

  isAvailableInstance(address: string) : Promise<boolean> {
    return this.hc.post(`${this._protocol}://${address}/api/meta`, {}).toPromise().then(
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
      name: 'AimyDog',
      callback: `${window.location.protocol}//${window.location.host}/callback/${address}`,
    });
    const sessionId = uuidv4();

    return `${this._protocol}://${address}/miauth/${sessionId}?${authQuery.toString()}`;
  }

  async callbackProcess(address: string, sessionId: string): Promise<boolean | undefined> {
    if (this._token !== undefined || this._address !== undefined) {
      return undefined;
    }
    return this.hc.post(`${this._protocol}://${address}/api/miauth/${sessionId}/check`, {}).toPromise().then(dataRaw => {
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
      this.sb.open('You have been logout.');
    });
  }
}
