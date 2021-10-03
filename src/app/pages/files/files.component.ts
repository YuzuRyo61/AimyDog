import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPageInfo } from "ngx-virtual-scroller";
import { DriveFile } from "../../interface/drive-file";
import { MkApiService } from "../../service/mk-api.service";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit, OnDestroy {
  items: DriveFile[] = [];
  isFailed = false;
  allLoaded = false;
  loading = true;
  private errorSnack?: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private mas: MkApiService,
    private sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.errorSnack !== undefined) this.errorSnack.dismiss();
  }

  vsEvent(event: IPageInfo): void {
    if (this.items.length !== 0 && event.endIndex === this.items.length - 1 && !this.isFailed && !this.allLoaded) {
      this.fetchData();
    }
  }

  private fetchData(): void {
    this.loading = true;
    const latestId = (this.items.length === 0) ? undefined : this.items.slice(-1)[0].id;
    this.mas.fetchFileList(latestId, undefined).subscribe(
      val => {
        this.items = this.items.concat(val);
        if (val.length === 0) {
          this.allLoaded = true;
          return;
        }
      },
      err => {
        console.error(err);
        this.isFailed = true;
        this.errorSnack = this.sb.open($localize`:@@common.fetch_failed:Fetch failed.`, $localize`:@@common.retry:Retry`, {
          duration: 0,
        });
        this.errorSnack.onAction().subscribe(() => {
          this.isFailed = false;
          this.fetchData();
        });
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
}
