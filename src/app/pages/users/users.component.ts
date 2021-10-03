import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPageInfo } from 'ngx-virtual-scroller';

import { UserSearchDialogComponent } from './user-search-dialog/user-search-dialog.component';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MkApiService } from "../../service/mk-api.service";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { User } from "../../interface/user";
import { UserSearchOption } from "../../interface/user-search-option";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  items: User[] = [];
  loading = true;
  searchOptionsForm = new FormGroup({
    sort: new FormControl('+createdAt', [
      Validators.required,
    ]),
    state: new FormControl('all', [
      Validators.required,
    ]),
    origin: new FormControl('local', [
      Validators.required,
    ]),
  });
  isFailed = false;
  allLoaded = false;
  private errorSnack?: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private sb: MatSnackBar,
    private md: MatDialog,
    private mas: MkApiService,
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
    this.mas.fetchUserList(this.items.length, this.searchOptionsForm.value as UserSearchOption).subscribe(
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
    const dialogRes = this.md.open(UserSearchDialogComponent, {
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
