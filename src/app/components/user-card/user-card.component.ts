import { Component, Input } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../interface/user";
import { AuthService } from "../../service/auth.service";
import { MatDialog } from "@angular/material/dialog";
import { UserDetailDialogComponent } from "../user-detail-dialog/user-detail-dialog.component";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() user?: User;

  constructor(
    private sb: MatSnackBar,
    public aus: AuthService,
    private md: MatDialog,
  ) { }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  isModInAdmin(): boolean {
    if (this.aus.credentials === undefined || this.user === undefined) return true;
    return this.aus.credentials.isModerator && this.user.isAdmin;
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

  openDetailDialog(): void {
    if (this.user === undefined) return;
    this.md.open(UserDetailDialogComponent, {
      data: this.user.id,
      autoFocus: false,
    });
  }

  genOpenUrl(): string | undefined {
    if (this.user === undefined) return undefined;
    let baseUrl = `${this.aus.protocol}//${this.aus.address}/@${this.user.username}`;
    if (this.user.host !== null) baseUrl += `@${this.user.host}`;
    return baseUrl;
  }
}
