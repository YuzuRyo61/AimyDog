import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MkApiService } from "../../../service/mk-api.service";
import { User } from "../../../interface/user";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from "@angular/material/dialog";
import { YnDialogComponent } from "../../../components/yn-dialog/yn-dialog.component";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId?: string;
  user?: User;
  isError = false;

  constructor(
    private route: ActivatedRoute,
    private ma: MkApiService,
    private sb: MatSnackBar,
    private dl: MatDialog,
    public aus: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId !== null) this.userId = userId;
      this.fetchData();
    });
  }

  fetchData(): void {
    if (this.userId === undefined) {
      this.isError = true;
      return;
    }
    this.isError = false;

    this.ma.fetchUser(this.userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
        this.isError = true;
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
        this.sb.open('Copied to clipboard');
      },
      () => {
        this.sb.open('Failed copy to clipboard');
      }
    );
  }

  genOpenUrl(): string | undefined {
    if (this.user === undefined) return undefined;
    return `${this.aus.protocol}://${this.aus.address}/@${this.user.username}`;
  }

  acct(): string {
    if (this.user === undefined) return '';

    if (this.user.host === null) {
      return `@${this.user.username}`;
    } else {
      return `@${this.user.username}@${this.user.host}`;
    }
  }

  openModeratorDialog(): void {
    if (this.user === undefined) return;

    if (this.user.isModerator) {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: 'Demote moderator',
          message: `Are you sure demote moderator to ${this.acct()}?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.removeModUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isModerator = false;
            this.sb.open('User demoted from moderator.');
          },
          err => {
            console.error(err);
            this.sb.open('Operation failed.');
          }
        );
      });
    } else {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: 'Promote to moderator',
          message: `Are you sure promote moderator to ${this.acct()}?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.addModUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isModerator = true;
            this.sb.open('User promoted to moderator.', undefined, {
              duration: 5000,
            });
          },
          err => {
            console.error(err);
            this.sb.open('Operation failed.', undefined, {
              duration: 5000,
            });
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
          title: 'Un-Silence',
          message: `Are you sure un-silence to ${this.acct()}?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.unSilenceUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSilenced = false;
            this.sb.open('User un-silenced.', undefined, {
              duration: 5000,
            });
          },
          err => {
            console.error(err);
            this.sb.open('Operation failed.', undefined, {
              duration: 5000,
            });
          }
        );
      });
    } else {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: 'Silence',
          message: `Are you sure silence to ${this.acct()}?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.silenceUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSilenced = true;
            this.sb.open('User silenced.', undefined, {
              duration: 5000,
            });
          },
          err => {
            console.error(err);
            this.sb.open('Operation failed.', undefined, {
              duration: 5000,
            });
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
          title: 'Unsuspend',
          message: `Are you sure unsuspend to ${this.acct()}?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.unSuspendUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSuspended = false;
            this.sb.open('User unsuspended.', undefined, {
              duration: 5000,
            });
          },
          err => {
            console.error(err);
            this.sb.open('Operation failed.', undefined, {
              duration: 5000,
            });
          }
        );
      });
    } else {
      const dialog = this.dl.open(YnDialogComponent, {
        data: {
          title: 'Suspend',
          message: `Are you sure suspend to ${this.acct()}?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.user === undefined) return;

        this.ma.suspendUser(this.user.id).subscribe(
          () => {
            if (this.user !== undefined) this.user.isSuspended = true;
            this.sb.open('User suspended.', undefined, {
              duration: 5000,
            });
          },
          err => {
            console.error(err);
            this.sb.open('Operation failed.', undefined, {
              duration: 5000,
            });
          }
        );
      });
    }
  }

}
