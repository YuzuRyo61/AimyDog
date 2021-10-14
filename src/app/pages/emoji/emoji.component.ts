import { Component, OnInit } from '@angular/core';
import { Emoji } from "../../interface/emoji";
import { MkApiService } from "../../service/mk-api.service";
import { IPageInfo } from 'ngx-virtual-scroller';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { EmojiSearchDialogComponent } from "./emoji-search-dialog/emoji-search-dialog.component";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {
  items: Emoji[] = [];
  loading = true;
  private isFailed = false;
  allLoaded = false;
  private errorSnack?: MatSnackBarRef<TextOnlySnackBar>;
  searchOption = new FormGroup({
    isRemote: new FormControl(false),
    query: new FormControl(''),
  })

  get isRemote(): FormControl {
    return this.searchOption.get('isRemote') as FormControl;
  }

  get query(): FormControl {
    return this.searchOption.get('query') as FormControl;
  }

  constructor(
    private mas: MkApiService,
    private md: MatDialog,
    private sb: MatSnackBar,
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
    if (this.errorSnack !== undefined) this.errorSnack.dismiss();
    const latestId = (this.items.length === 0) ? undefined : this.items.slice(-1)[0].id;
    let endpoint: Observable<Emoji[]>;
    if (this.isRemote.value) {
      endpoint = this.mas.fetchRemoteEmojiList(latestId, this.query.value);
    } else {
      endpoint = this.mas.fetchLocalEmojiList(latestId, this.query.value);
    }
    endpoint.subscribe(
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
    const searchDialog = this.md.open(EmojiSearchDialogComponent, {
      data: this.searchOption,
      disableClose: true,
    });
    searchDialog.afterClosed().subscribe(
      res => {
        if (res === undefined) return;
        this.searchOption = res;
        this.isFailed = false;
        this.allLoaded = false;
        this.items = [];
        this.fetchData();
      }
    );
  }
}
