import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interface/user";
import { UserSearchOption } from "../interface/user-search-option";
import { DriveFile } from "../interface/drive-file";
import { FileSearchOption } from "../interface/file-search-option";
import { ReportSearchOption } from "../interface/report-search-option";
import { Report } from "../interface/report";

@Injectable({
  providedIn: 'root'
})
export class MkApiService {
  constructor(
    private aus: AuthService,
    private hc: HttpClient,
  ) { }

  private _limit = 100;

  get limit(): number {
    return this._limit;
  }

  set limit(val: number) {
    if (val <= 0 || val > 100) throw Error('limit is must between 1 and 100');
    this._limit = Math.floor(val);
  }

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
      limit: this._limit,
      offset,
      ...searchOption,
    }) as Observable<User[]>;
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
      limit: this._limit,
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

  fileDelete(fileId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/drive/files/delete`, {
      i: this.aus.token,
      fileId: fileId,
    }) as Observable<unknown>;
  }

  fetchReportList(untilId?: string, searchOption?: ReportSearchOption): Observable<Report[]> {
    return this.hc.post(`${this.baseUrl}/admin/abuse-user-reports`, {
      i: this.aus.token,
      limit: this._limit,
      untilId: untilId,
      ...searchOption,
    }) as Observable<Report[]>;
  }

  markAsResolvedReport(reportId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/resolve-abuse-user-report`, {
      i: this.aus.token,
      reportId: reportId,
    }) as Observable<unknown>;
  }

}
