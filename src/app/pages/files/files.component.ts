import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPageInfo } from "ngx-virtual-scroller";
import { DriveFile } from "../../interface/drive-file";
import { MkApiService } from "../../service/mk-api.service";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FileSearchDialogComponent } from "./file-search-dialog/file-search-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FileSearchOption } from "../../interface/file-search-option";

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
  searchOptionsForm = new FormGroup({
    type: new FormControl(null),
    origin: new FormControl('local', [
      Validators.required,
    ]),
    hostname: new FormControl(null),
  }, );

  constructor(
    private mas: MkApiService,
    private sb: MatSnackBar,
    private md: MatDialog,
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
    this.mas.fetchFileList(latestId, this.searchOptionsForm.value as FileSearchOption).subscribe(
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

  openSearchDialog(): void {
    const dialogRes = this.md.open(FileSearchDialogComponent, {
      data: this.searchOptionsForm,
      disableClose: true,
    });
    dialogRes.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.searchOptionsForm = result;
        this.items = [];
        this.allLoaded = false;
        this.isFailed = false;
        this.fetchData();
      }
    });
  }
}
