import { Component, OnInit } from '@angular/core';
import { ModerationLog } from "../../../interface/moderation-log";
import { IPageInfo } from "ngx-virtual-scroller";
import { MkApiService } from "../../../service/mk-api.service";

@Component({
  selector: 'app-mod-log-card',
  templateUrl: './mod-log-card.component.html',
  styleUrls: ['./mod-log-card.component.scss']
})
export class ModLogCardComponent implements OnInit {
  moderationLogs?: ModerationLog[];
  allLoaded = false;
  isFailed = false;
  loading = false;

  constructor(
    private mas: MkApiService,
  ) {
  }

  ngOnInit(): void {
    this.fetchAudit();
  }

  scrollEvent(event: IPageInfo): void {
    if (this.moderationLogs !== undefined && event.endIndex === this.moderationLogs.length - 1 && !this.allLoaded && !this.isFailed && !this.loading) {
      this.fetchAudit();
    }
  }

  private fetchAudit(): void {
    if (this.loading) return;
    this.loading = true;
    const latestId = (this.moderationLogs === undefined) ? undefined : this.moderationLogs.slice(-1)[0].id;
    this.mas.fetchAuditLog(latestId).subscribe(
      val => {
        if (this.moderationLogs === undefined) {
          this.moderationLogs = val;
        } else {
          this.moderationLogs = this.moderationLogs.concat(val);
        }
        if (val.length === 0) this.allLoaded = true;
      },
      err => {
        console.log(err);
        this.isFailed = true;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
