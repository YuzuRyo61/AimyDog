import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { UserRelationListDialogOption } from "../../interface/user-relation-list-dialog-option";
import { MkApiService } from "../../service/mk-api.service";
import { UserRelation } from "../../interface/user-relation";
import { UserDetailDialogComponent } from "../user-detail-dialog/user-detail-dialog.component";
import { IPageInfo } from "ngx-virtual-scroller";
import { AuthService } from "../../service/auth.service";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-relation-list-dialog',
  templateUrl: './user-relation-list-dialog.component.html',
  styleUrls: ['./user-relation-list-dialog.component.scss']
})
export class UserRelationListDialogComponent implements OnInit, OnDestroy {
  items: UserRelation[] = [];
  isFailed = false;
  allLoaded = false;
  loading = true;
  private errorSnack?: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private ma: MkApiService,
    private dl: MatDialog,
    public aus: AuthService,
    private sb: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: UserRelationListDialogOption,
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
    const untilId = (this.items.length === 0) ? undefined : this.items.slice(-1)[0].id;

    if (this.data.type === 'following') {
      this.ma.fetchUserFollowingList(this.data.userId, untilId).subscribe(
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
        },
      );
    } else {
      this.ma.fetchUserFollowerList(this.data.userId, untilId).subscribe(
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
          this.loading = false;
        },
        () => {
          this.loading = false;
        },
      );
    }
  }

  openUserDetailDialog(userId: string): void {
    this.dl.open(UserDetailDialogComponent, {
      data: userId,
      autoFocus: false,
    });
  }
}
