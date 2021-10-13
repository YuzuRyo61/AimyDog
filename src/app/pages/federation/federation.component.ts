import { Component, OnDestroy, OnInit } from '@angular/core';
import { MkApiService } from "../../service/mk-api.service";
import { Federation } from "../../interface/federation";
import { IPageInfo } from "ngx-virtual-scroller";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { FederationSearchDialogComponent } from "./federation-search-dialog/federation-search-dialog.component";
import { FederationListSearchOption } from "../../interface/federation-list-search-option";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-federation',
  templateUrl: './federation.component.html',
  styleUrls: ['./federation.component.scss']
})
export class FederationComponent implements OnInit, OnDestroy {
  items: Federation[] = [];
  loading = true;
  allLoaded = false;
  private isFailed = false;
  searchOption = new FormGroup({
    host: new FormControl(null),
    blocked: new FormControl(null),
    notResponding: new FormControl(null),
    suspended: new FormControl(null),
    federating: new FormControl(null),
    subscribing: new FormControl(null),
    publishing: new FormControl(null),
    sort: new FormControl('+caughtAt'),
  });
  private errorSnack?: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private mas: MkApiService,
    private md: MatDialog,
    private sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.errorSnack !== undefined) this.errorSnack.dismiss();
  }

  private fetchData(): void {
    this.loading = true;
    this.isFailed = false;
    this.mas.fetchFederationList(this.items.length, this.searchOption.value as FederationListSearchOption).subscribe(
      res => {
        this.items = this.items.concat(res);
        if (res.length === 0) this.allLoaded = true;
      },
      err => {
        console.error(err);
        this.isFailed = true;
        this.loading = false;
        this.errorSnack = this.sb.open($localize`:@@common.fetch_failed:Fetch failed.`, $localize`:@@common.retry:Retry`, {
          duration: 0,
        });
        this.errorSnack.onAction().subscribe(() => {
          this.isFailed = false;
          this.fetchData();
        });
      },
      () => {
        this.loading = false;
      }
    );
  }

  vsEvent(event: IPageInfo): void {
    if (this.items.length !== 0 && event.endIndex === this.items.length - 1 && !this.isFailed && !this.allLoaded) {
      this.fetchData();
    }
  }

  openSearchDialog(): void {
    const searchOptionDialog = this.md.open(FederationSearchDialogComponent, {
      disableClose: true,
      data: this.searchOption,
    });
    searchOptionDialog.afterClosed().subscribe(
      res => {
        if (res === undefined) return;
        this.searchOption = res;
        this.items = [];
        this.allLoaded = false;
        this.isFailed = false;
        if (this.errorSnack !== undefined) this.errorSnack.dismiss();
        this.fetchData();
      }
    );
  }

}
