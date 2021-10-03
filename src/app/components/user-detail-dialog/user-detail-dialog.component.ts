import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MkApiService } from "../../service/mk-api.service";
import { User } from "../../interface/user";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { YnDialogComponent } from "../yn-dialog/yn-dialog.component";
import { UserRelationListDialogComponent } from "../user-relation-list-dialog/user-relation-list-dialog.component";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})
export class UserDetailDialogComponent implements OnInit, OnDestroy {
  user?: User;
  loading = true;
  private errorSnack?: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private route: ActivatedRoute,
    private ma: MkApiService,
    private sb: MatSnackBar,
    private dl: MatDialog,
    public aus: AuthService,
    @Inject(MAT_DIALOG_DATA) private userId: string,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  ngOnDestroy(): void {
    if (this.errorSnack !== undefined) this.errorSnack.dismiss();
  }

  private fetchData(): void {
    this.loading = true;

    this.ma.fetchUser(this.userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.error(error);
        this.errorSnack = this.sb.open($localize`:@@common.fetch_failed:Fetch failed.`, $localize`:@@common.retry:Retry`, {
          duration: 0,
        });
        this.errorSnack.onAction().subscribe(() => {
          this.fetchData();
        });
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyUserId(): void {
    if (this.user === undefined) return;

    navigator.clipboard.writeText(this.user.id).then(
      () => {
        this.sb.open($localize`:@@common.copy.success:Copied to clipboard`);
      },
      () => {
        this.sb.open($localize`:@@common.copy.failed:Failed copy to clipboard`);
      }
    );
  }

  genOpenUrl(): string | undefined {
    if (this.user === undefined) return undefined;
    let baseUrl = `${this.aus.protocol}//${this.aus.address}/@${this.user.username}`;
    if (this.user.host !== null) baseUrl += `@${this.user.host}`;
    return baseUrl;
  }

  acct(): string {
    if (this.user === undefined) return '';

    if (this.user.host === null) {
      return `@${this.user.username}`;
    } else {
      return `@${this.user.username}@${this.user.host}`;
    }
  }

  showFollowingRelationDialog(): void {
    if (this.user === undefined) return;
    this.dl.open(UserRelationListDialogComponent, {
      data: {
        type: 'following',
        userId: this.user.id,
      }
    });
  }

  showFollowerRelationDialog(): void {
    if (this.user === undefined) return;
    this.dl.open(UserRelationListDialogComponent, {
      data: {
        type: 'follower',
        userId: this.user.id,
      }
    });
  }

  openModeratorDialog(): void {
    if (this.user === undefined) return;

    if (this.user.isModerator) {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: $localize`:@@user.detail.demote_mod.title:Demote moderator`,
          message: $localize`:@@user.detail.demote_mod.message:Are you sure demote moderator?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.removeModUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isModerator = false;
            this.sb.open($localize`:@@user.detail.demote_mod.success:User demoted from moderator.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    } else {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: $localize`:@@user.detail.promote_mod.title:Promote to moderator`,
          message: $localize`:@@user.detail.promote_mod.message:Are you sure promote moderator?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.addModUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isModerator = true;
            this.sb.open($localize`:@@user.detail.promote_mod.success:User promoted to moderator.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    }
  }

  openSilenceDialog(): void {
    if (this.user === undefined) return;

    if (this.user.isSilenced) {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: $localize`:@@user.detail.un_silence.title:Un-Silence`,
          message: $localize`:@@user.detail.un_silence.message:Are you sure un-silence?`,
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.unSilenceUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSilenced = false;
            this.sb.open($localize`:@@user.detail.un_silence.success:User un-silenced.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    } else {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: $localize`:@@user.detail.silence.title:Silence`,
          message: $localize`:@@user.detail.silence.message:Are you sure silence?`,
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.silenceUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSilenced = true;
            this.sb.open($localize`:@@user.detail.silence.success:User silenced.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    }
  }

  openSuspendDialog(): void {
    if (this.user === undefined) return;

    if (this.user.isSuspended) {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: $localize`:@@user.detail.unsuspend.title:Unsuspend`,
          message: $localize`:@@user.detail.unsuspend.message:Are you sure unsuspend?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.unSuspendUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSuspended = false;
            this.sb.open($localize`:@@user.detail.unsuspend.success:User unsuspended.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    } else {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: $localize`:@@user.detail.suspend.title:Suspend`,
          message: $localize`:@@user.detail.suspend.message:Are you sure suspend?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.suspendUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSuspended = true;
            this.sb.open($localize`:@@user.detail.suspend.success:User suspended.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    }
  }

}
