import { Component, Input } from '@angular/core';
import { DriveFile } from "../../interface/drive-file";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { UserDetailDialogComponent } from "../user-detail-dialog/user-detail-dialog.component";
import { FileDetailDialogComponent } from "../file-detail-dialog/file-detail-dialog.component";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent {
  @Input() file?: DriveFile;

  constructor(
    private sb: MatSnackBar,
    private dl: MatDialog,
    public aus: AuthService,
  ) {}

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyUserId(): void {
    if (this.file === undefined) return;

    navigator.clipboard.writeText(this.file.id).then(
      () => {
        this.sb.open($localize`:@@common.copy.success:Copied to clipboard`);
      },
      () => {
        this.sb.open($localize`:@@common.copy.failed:Failed copy to clipboard`);
      }
    );
  }

  openOwnerUserDialog(): void {
    if (this.file === undefined || this.file?.userId === null) return;
    this.dl.open(UserDetailDialogComponent, {
      data: this.file.userId,
    });
  }

  openFileDetailDialog(): void {
    if (this.file === undefined) return;
    this.dl.open(FileDetailDialogComponent, {
      data: this.file.id,
    });
  }
}
