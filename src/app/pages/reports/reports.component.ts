import { Component, OnInit } from '@angular/core';
import { MkApiService } from "../../service/mk-api.service";
import { Report } from "../../interface/report";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  items: Report[] = [];
  allLoaded = false;

  constructor(
    private mas: MkApiService,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    const latestId = (this.items.length === 0) ? undefined : this.items.slice(-1)[0].id;
    this.mas.fetchReportList(latestId, undefined).subscribe(
      val => {
        this.items = this.items.concat(val);
        if (val.length === 0) {
          this.allLoaded = true;
        }
      },
      err => {
        console.error(err);
      },
      () => {
        //
      }
    );
  }
}
