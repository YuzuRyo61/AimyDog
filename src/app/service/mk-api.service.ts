import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interface/user";
import { UserSearchOption } from "../interface/user-search-option";
import { DriveFile } from "../interface/drive-file";
import { FileSearchOption } from "../interface/file-search-option";
import { UserRelation } from "../interface/user-relation";

@Injectable({
  providedIn: 'root'
})
export class MkApiService {
  constructor(
    private aus: AuthService,
    private hc: HttpClient,
  ) { }

  get baseUrl(): string {
    return `${this.aus.protocol}//${this.aus.address}/api`;
  }

  fetchUser(userId: string): Observable<User> {
    return this.hc.post(`${this.baseUrl}/admin/show-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<User>;
  }

  fetchUserList(offset?: number, searchOption?: UserSearchOption): Observable<User[]> {
    return this.hc.post(`${this.baseUrl}/admin/show-users`, {
      i: this.aus.token,
      limit: 100,
      offset,
      ...searchOption,
    }) as Observable<User[]>;
  }

  fetchUserFollowingList(userId: string, untilId?: string): Observable<UserRelation[]> {
    return this.hc.post(`${this.baseUrl}/users/following`, {
      userId,
      untilId,
      limit: 100,
    }) as Observable<UserRelation[]>;
  }

  fetchUserFollowerList(userId: string, untilId?: string): Observable<UserRelation[]> {
    return this.hc.post(`${this.baseUrl}/users/followers`, {
      userId,
      untilId,
      limit: 100,
    }) as Observable<UserRelation[]>;
  }

  addModUser(userId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/moderators/add`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<unknown>;
  }

  removeModUser(userId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/moderators/remove`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<unknown>;
  }

  silenceUser(userId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/silence-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<unknown>;
  }

  unSilenceUser(userId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/unsilence-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<unknown>;
  }

  suspendUser(userId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/suspend-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<unknown>;
  }

  unSuspendUser(userId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/unsuspend-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<unknown>;
  }

  fetchFileList(untilId?: string, searchOption?: FileSearchOption): Observable<DriveFile[]> {
    return this.hc.post(`${this.baseUrl}/admin/drive/files`, {
      i: this.aus.token,
      limit: 100,
      untilId,
      ...searchOption,
    }) as Observable<DriveFile[]>;
  }

  fetchFileById(fileId: string): Observable<DriveFile> {
    return this.hc.post(`${this.baseUrl}/admin/drive/show-file`, {
      i: this.aus.token,
      fileId: fileId,
    }) as Observable<DriveFile>;
  }

  fileSensitive(fileId: string, isSensitive: boolean): Observable<DriveFile> {
    return this.hc.post(`${this.baseUrl}/drive/files/update`, {
      i: this.aus.token,
      fileId: fileId,
      isSensitive: isSensitive,
    }) as Observable<DriveFile>;
  }

}
