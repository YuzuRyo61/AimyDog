import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interface/user";
import { UserSearchOption } from "../interface/user-search-option";
import { DriveFile } from "../interface/drive-file";

@Injectable({
  providedIn: 'root'
})
export class MkApiService {
  constructor(
    private aus: AuthService,
    private hc: HttpClient,
  ) { }

  get baseUrl(): string {
    return `${this.aus.protocol}://${this.aus.address}/api`;
  }

  fetchUser(userId: string): Observable<User> {
    return this.hc.post(`${this.baseUrl}/admin/show-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<User>;
  }

  fetchUserList(offset: number = 0, searchOption?: UserSearchOption): Observable<User[]> {
    return this.hc.post(`${this.baseUrl}/admin/show-users`, {
      i: this.aus.token,
      limit: 100,
      offset: offset,
      ...searchOption,
    }) as Observable<User[]>;
  }

  addModUser(userId: string): Observable<object> {
    return this.hc.post(`${this.baseUrl}/admin/moderators/add`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<object>;
  }

  removeModUser(userId: string): Observable<object> {
    return this.hc.post(`${this.baseUrl}/admin/moderators/remove`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<object>;
  }

  silenceUser(userId: string): Observable<object> {
    return this.hc.post(`${this.baseUrl}/admin/silence-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<object>;
  }

  unSilenceUser(userId: string): Observable<object> {
    return this.hc.post(`${this.baseUrl}/admin/unsilence-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<object>;
  }

  suspendUser(userId: string): Observable<object> {
    return this.hc.post(`${this.baseUrl}/admin/suspend-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<object>;
  }

  unSuspendUser(userId: string): Observable<object> {
    return this.hc.post(`${this.baseUrl}/admin/unsuspend-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<object>;
  }

  fetchFileList(untilId?: string, searchOption?: any): Observable<DriveFile[]> {
    return this.hc.post(`${this.baseUrl}/admin/drive/files`, {
      i: this.aus.token,
      limit: 100,
      untilId,
      ...searchOption,
    }) as Observable<DriveFile[]>;
  }
}
