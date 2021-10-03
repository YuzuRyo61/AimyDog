import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MkApiService } from "../../service/mk-api.service";
import { DriveFile } from "../../interface/drive-file";
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from "@angular/material/snack-bar";
import { UserDetailDialogComponent } from "../user-detail-dialog/user-detail-dialog.component";
import { AuthService } from "../../service/auth.service";
import { YnDialogComponent } from "../yn-dialog/yn-dialog.component";

@Component({
  selector: 'app-file-detail-dialog',
  templateUrl: './file-detail-dialog.component.html',
  styleUrls: ['./file-detail-dialog.component.scss']
})
export class FileDetailDialogComponent implements OnInit, OnDestroy {
  loading = true;
  file?: DriveFile;
  private errorSnack?: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    private mas: MkApiService,
    private sb: MatSnackBar,
    private md: MatDialog,
    public aus: AuthService,
    private dr: MatDialogRef<FileDetailDialogComponent>,
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
    this.mas.fetchFileById(this.userId).subscribe(
      val => {
        this.file = val;
      },
      err => {
        console.error(err);
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
      },
    );
  }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyToClipboard(text: string | null): void {
    if (this.file === undefined || text === null) return;

    navigator.clipboard.writeText(text).then(
      () => {
        this.sb.open($localize`:@@common.copy.success:Copied to clipboard`);
      },
      () => {
        this.sb.open($localize`:@@common.copy.failed:Failed copy to clipboard`);
      }
    );
  }

  openOwnerDetailDialog(): void {
    if (this.file === undefined || this.file.userId === null) return;
    this.md.open(UserDetailDialogComponent, {
      data: this.file.userId,
      autoFocus: false,
    });
  }

  openSensitiveDialog(): void {
    if (this.file === undefined) return;

    if (this.file.isSensitive) {
      const dialog = this.md.open(YnDialogComponent, {
        data: {
          title: $localize`:@@file.detail.un_sensitive.title:Un-sensitive`,
          message: $localize`:@@file.detail.un_sensitive.message:Are you sure unmark sensitive to this file?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.file === undefined) return;

        this.mas.fileSensitive(this.file.id, false).subscribe(
          () => {
            if (this.file !== undefined) this.file.isSensitive = false;
            this.sb.open($localize`:@@file.detail.un_sensitive.success:File unmarked sensitive.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    } else {
      const dialog = this.md.open(YnDialogComponent, {
        data: {
          title: $localize`:@@file.detail.sensitive.title:Sensitive`,
          message: $localize`:@@file.detail.sensitive.message:Are you sure mark sensitive to this file?`
        },
      });

      dialog.afterClosed().subscribe(res => {
        if (res === undefined || res !== true || this.file === undefined) return;

        this.mas.fileSensitive(this.file.id, true).subscribe(
          () => {
            if (this.file !== undefined) this.file.isSensitive = true;
            this.sb.open($localize`:@@file.detail.sensitive.success:File marked sensitive.`);
          },
          err => {
            console.error(err);
            this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
          }
        );
      });
    }
  }

  openDeleteDialog(): void {
    if (this.file === undefined) return;
    const dialog = this.md.open(YnDialogComponent, {
      data: {
        title: $localize`:@@file.detail.delete.title:Delete file`,
        message: $localize`:@@file.detail.delete.message:Are you sure delete this file?`
      },
    });
    dialog.afterClosed().subscribe(res => {
      if (res === undefined || res !== true || this.file === undefined) return;
      this.mas.fileDelete(this.file.id).subscribe(
        () => {
          this.sb.open($localize`:@@file.detail.delete.success:File deleted.`);
          if (this.file !== undefined) this.dr.close(this.file.id);
        },
        err => {
          console.error(err);
          this.sb.open($localize`:@@common.operation_failed:Operation failed.`);
        }
      );
    });
  }
}
