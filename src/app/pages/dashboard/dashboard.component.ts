import { Component, OnInit } from '@angular/core';
import { MkApiService } from "../../service/mk-api.service";
import { MkStats } from "../../interface/mk-stats";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats?: MkStats;

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
  }
}
