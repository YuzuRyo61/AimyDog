import { Component, OnInit } from '@angular/core';
import { MkApiService } from "../../service/mk-api.service";
import { Report } from "../../interface/report";
import { MatDialog } from "@angular/material/dialog";
import { ReportSearchDialogComponent } from "./report-search-dialog/report-search-dialog.component";
import { FormControl, FormGroup } from "@angular/forms";
import { IPageInfo } from "ngx-virtual-scroller";
import { ReportSearchOption } from "../../interface/report-search-option";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  items: Report[] = [];
  allLoaded = false;
  loading = true;
  searchOptionsForm = new FormGroup({
    state: new FormControl('unresolved'),
    reporterOrigin: new FormControl('combined'),
    targetUserOrigin: new FormControl('combined'),
  })
  isFailed = false;

  constructor(
    private mas: MkApiService,
    private md: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  vsEvent(event: IPageInfo): void {
    if (this.items.length !== 0 && event.endIndex === this.items.length - 1 && !this.isFailed && !this.allLoaded) {
      this.fetchData();
    }
  }

  private fetchData(): void {
    this.loading = true;
    const latestId = (this.items.length === 0) ? undefined : this.items.slice(-1)[0].id;
    const searchOption = this.searchOptionsForm.value as ReportSearchOption;
    if (searchOption.state === '') searchOption.state = null;
    this.mas.fetchReportList(latestId, searchOption).subscribe(
      val => {
        this.items = this.items.concat(val);
        if (val.length === 0) {
          this.allLoaded = true;
        }
      },
      err => {
        console.error(err);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  openSearchDialog(): void {
    const dialogRes = this.md.open(ReportSearchDialogComponent, {
      data: this.searchOptionsForm,
      disableClose: true,
    });
    dialogRes.afterClosed().subscribe(result => {
      if (result === undefined) return;
      this.searchOptionsForm = result;
      this.items = [];
      this.allLoaded = false;
      this.isFailed = false;
      this.fetchData();
    });
  }
}
