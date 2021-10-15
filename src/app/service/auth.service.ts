import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as semver from 'semver';
import { v4 as uuidv4 } from 'uuid';
import { MiAuthResponse } from "../interface/mi-auth-response";
import { User } from "../interface/user";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MkMeta } from "../interface/mk-meta";
import { APP_BASE_HREF } from "@angular/common";

// noinspection JSMethodCanBeStatic
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _credentials?: User;
  private _notifyPerm = false;

  constructor(
    private hc: HttpClient,
    private router: Router,
    private sb: MatSnackBar,
    @Inject(APP_BASE_HREF) private abh: string,
  ) { }

  get protocol(): 'http:' | 'https:' {
    const protocol = localStorage.getItem('protocol');
    if (protocol === null || (protocol !== 'http:' && protocol !== 'https:')) return 'https:';
    return protocol as 'http:' | 'https:';
  }

  set protocol(val: 'http:' | 'https:') {
    localStorage.setItem('protocol', val);
  }

  get address(): string | undefined {
    const address = localStorage.getItem('address');
    if (address === null) return undefined;
    return address;
  }

  set address(val: string | undefined) {
    if (val === undefined) {
      localStorage.removeItem('address');
      return;
    }
    localStorage.setItem('address', val);
  }

  get token(): string | undefined {
    const token = localStorage.getItem('token');
    if (token === null) return undefined;
    return token;
  }

  private set token(val: string | undefined) {
    if (val === undefined) {
      localStorage.removeItem('token');
      return;
    }
    localStorage.setItem('token', val);
  }

  isLogin(): boolean {
    return this.token !== undefined && this.address !== undefined;
  }

  get credentials(): User | undefined {
    return this._credentials;
  }

  initNotification(): void {
    if (!('Notification' in window)) return;
    Notification.requestPermission().then(perm => {
      if (perm === 'granted') {
        this._notifyPerm = true;
      }
    });
  }

  get notifyPerm(): boolean {
    return this._notifyPerm;
  }

  onInit(): void {
    if (this.token !== undefined) {
      this.getCredentials();
      this.initNotification();
    }
  }

  private getCredentials(): void {
    this.hc.post(`${this.protocol}//${this.address}/api/i`, { i: this.token }).toPromise().then(res => {
      this._credentials = res as User;
    }).catch(err => {
      console.error(err);
      this.sb.open($localize`:@@common.bad_credentials:Cannot fetch your credentials.`);
    });
  }

  isAvailableInstance(address: string) : Promise<boolean> {
    return this.hc.post(`${this.protocol}//${address}/api/meta`, {}).toPromise().then(
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

  generateMiAuthUrl(address: string): string {
    const authQuery = new URLSearchParams({
      name: 'AimyDog',
      permission: 'write:drive',
      callback: `${window.location.protocol}//${window.location.host}${this.abh.replace(/\/$/i, '')}` + this.router.createUrlTree(['/callback']),
    });
    const sessionId = uuidv4();

    return `${this.protocol}//${address}/miauth/${sessionId}?${authQuery.toString()}`;
  }

  async callbackProcess(sessionId: string): Promise<boolean | undefined> {
    if (this.token !== undefined && this.address !== undefined) {
      return undefined;
    }
    return this.hc.post(`${this.protocol}//${this.address}/api/miauth/${sessionId}/check`, {}).toPromise().then(dataRaw => {
      const data = dataRaw as MiAuthResponse;
      if (!data.ok || data.token === undefined || !(data.user?.isAdmin || data.user?.isModerator)) {
        return false;
      }

      this.token = data.token;
      this.getCredentials();

      return true;
    }).catch(err => {
      console.error(err);
      return false;
    });
  }

  destroySession(): void {
    this.token = undefined;
    this.address = undefined;
    this._credentials = undefined;
    this.protocol = 'https:';
    this.router.navigate(['/']).then(() => {
      this.sb.open($localize`:@@common.logout:You have been logout.`);
    });
  }
}
