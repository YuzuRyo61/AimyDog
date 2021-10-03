import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { UserRelationListDialogOption } from "../../interface/user-relation-list-dialog-option";
import { MkApiService } from "../../service/mk-api.service";
import { UserRelation } from "../../interface/user-relation";
import { UserDetailDialogComponent } from "../user-detail-dialog/user-detail-dialog.component";
import { IPageInfo } from "ngx-virtual-scroller";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-user-relation-list-dialog',
  templateUrl: './user-relation-list-dialog.component.html',
  styleUrls: ['./user-relation-list-dialog.component.scss']
})
export class UserRelationListDialogComponent implements OnInit {
  items: UserRelation[] = [];
  isFailed = false;
  allLoaded = false;
  loading = true;

  constructor(
    private ma: MkApiService,
    private dl: MatDialog,
    public aus: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: UserRelationListDialogOption,
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
          this.isFailed = true;
          console.error(err);
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
          this.isFailed = true;
          console.error(err);
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
