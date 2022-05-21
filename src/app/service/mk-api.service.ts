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
import { FederationListSearchOption } from "../interface/federation-list-search-option";
import { Federation } from "../interface/federation";
import { Emoji } from "../interface/emoji";
import { MkStats } from "../interface/mk-stats";
import { ModerationLog } from "../interface/moderation-log";
import { ServerInfo } from "../interface/server-info";
import { MkMeta } from "../interface/mk-meta";

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

  fetchMeta(): Observable<MkMeta> {
    return this.hc.post(`${this.baseUrl}/meta`, {
      i: this.aus.token,
      detail: true,
    }) as Observable<MkMeta>;
  }

  fetchStats(): Observable<MkStats> {
    return this.hc.post(`${this.baseUrl}/stats`, {
      i: this.aus.token,
    }) as Observable<MkStats>;
  }

  fetchAuditLog(untilId?: string): Observable<ModerationLog[]> {
    return this.hc.post(`${this.baseUrl}/admin/show-moderation-logs`, {
      i: this.aus.token,
      limit: this._limit,
      untilId,
    }) as Observable<ModerationLog[]>;
  }

  fetchServerInfo(): Observable<ServerInfo> {
    return this.hc.post(`${this.baseUrl}/server-info`, {
      i: this.aus.token,
    }) as Observable<ServerInfo>;
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

  updateRemoteUser(userId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/federation/update-remote-user`, {
      i: this.aus.token,
      userId: userId,
    }) as Observable<unknown>;
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

  fetchFederationList(offset?: number, searchOption?: FederationListSearchOption): Observable<Federation[]> {
    return this.hc.post(`${this.baseUrl}/federation/instances`, {
      i: this.aus.token,
      limit: this._limit,
      offset,
      ...searchOption,
    }) as Observable<Federation[]>;
  }

  fetchFederation(host: string): Observable<Federation> {
    return this.hc.post(`${this.baseUrl}/federation/show-instance`, {
      i: this.aus.token,
      host: host,
    }) as Observable<Federation>;
  }

  updateFederation(host: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/federation/refresh-remote-instance-metadata`, {
      i: this.aus.token,
      host: host,
    }) as Observable<unknown>;
  }

  removeAllFollowingFederation(host: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/federation/remove-all-following`, {
      i: this.aus.token,
      host: host,
    }) as Observable<unknown>;
  }

  removeAllFilesFederation(host: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/federation/delete-all-files`, {
      i: this.aus.token,
      host: host,
    }) as Observable<unknown>;
  }

  fetchLocalEmojiList(untilId?: string, query?: string): Observable<Emoji[]> {
    return this.hc.post(`${this.baseUrl}/admin/emoji/list`, {
      i: this.aus.token,
      limit: this._limit,
      untilId,
      query,
    }) as Observable<Emoji[]>;
  }

  fetchRemoteEmojiList(untilId?: string, query?: string, host?: string): Observable<Emoji[]> {
    return this.hc.post(`${this.baseUrl}/admin/emoji/list-remote`, {
      i: this.aus.token,
      limit: this._limit,
      untilId,
      query,
      host,
    }) as Observable<Emoji[]>;
  }

  editEmoji(emoji: Emoji): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/emoji/update`, {
      i: this.aus.token,
      id: emoji.id,
      name: emoji.name,
      category: emoji.category,
      aliases: emoji.aliases,
    }) as Observable<unknown>;
  }

  removeEmoji(emojiId: string): Observable<unknown> {
    return this.hc.post(`${this.baseUrl}/admin/emoji/remove`, {
      i: this.aus.token,
      id: emojiId,
    }) as Observable<unknown>;
  }
}
