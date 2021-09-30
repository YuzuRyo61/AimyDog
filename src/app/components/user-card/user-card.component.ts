import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { User } from "../../interface/user";
import { AuthService } from "../../service/auth.service";

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
  ) { }

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
}
