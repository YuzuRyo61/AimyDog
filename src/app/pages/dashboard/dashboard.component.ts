import { Component, OnInit } from '@angular/core';
import { MkApiService } from "../../service/mk-api.service";
import { MkStats } from "../../interface/mk-stats";
import { ModerationLog } from "../../interface/moderation-log";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats?: MkStats;
  moderationLogs?: ModerationLog[];

  constructor(
    private mas: MkApiService,
  ) {
  }

  ngOnInit(): void {
    this.mas.fetchMeta().subscribe(
      val => {
        this.stats = val;
      },
      err => {
        console.error(err);
      }
    );
    this.fetchAudit();
  }

  private fetchAudit(): void {
    this.mas.fetchAuditLog().subscribe(
      val => {
        if (this.moderationLogs === undefined) {
          this.moderationLogs = val;
        } else {
          this.moderationLogs = this.moderationLogs.concat(val);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
