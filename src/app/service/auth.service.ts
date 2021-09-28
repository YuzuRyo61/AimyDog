import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as semver from 'semver';
import { v4 as uuidv4 } from 'uuid';
import {MiAuthResponse} from "../interface/mi-auth-response";
import {environment} from "../../environments/environment";
import {User} from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private protocol = 'https';
  private _address?: string;
  private _token?: string;
  private _credentials?: User;

  constructor(
    private cs: CookieService,
    private hc: HttpClient,
  ) { }

  get address(): string | undefined {
    return this._address;
  }

  get token(): string | undefined {
    return this._token;
  }

  get isLogin(): boolean {
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

  getCredentials(): void {
    this.hc.post(`${this.protocol}://${this._address}/api/i`, {i: this._token}).toPromise().then(res => {
      this._credentials = res as User;
    }).catch(err => {
      console.error(err);
      this.cs.deleteAll();
      window.location.reload();
    });
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
      callback: `${window.location.protocol}//${window.location.host}/callback/${address}`,
    });
    const sessionId = uuidv4();

    return `${this.protocol}://${address}/miauth/${sessionId}?${authQuery.toString()}`;
  }

  async callbackProcess(address: string, sessionId: string): Promise<boolean> {
    return this.hc.post(`${this.protocol}://${address}/api/miauth/${sessionId}/check`, {}).toPromise().then(dataRaw => {
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

      return true;
    });
  }
}
