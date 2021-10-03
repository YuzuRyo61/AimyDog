import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MkApiService } from "../../service/mk-api.service";
import { DriveFile } from "../../interface/drive-file";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-file-detail-dialog',
  templateUrl: './file-detail-dialog.component.html',
  styleUrls: ['./file-detail-dialog.component.scss']
})
export class FileDetailDialogComponent implements OnInit {
  loading = true;
  isError = false;
  file?: DriveFile;

  constructor(
    private mas: MkApiService,
    private sb: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private userId: string,
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.isError = false;
    this.loading = true;
    this.mas.fetchFileById(this.userId).subscribe(
      val => {
        this.file = val;
      },
      err => {
        console.error(err);
      },
      () => {
        this.loading = false;
      },
    );
  }

  isAvailableCopy(): boolean {
    return navigator.clipboard !== undefined;
  }

  copyUserId(): void {
    if (this.file === undefined) return;

    this.copyToClipboard(this.file.id);
  }

  copyMd5(): void {
    if (this.file === undefined) return;

    this.copyToClipboard(this.file.md5);
  }

  private copyToClipboard(text: string): void {
    if (this.file === undefined) return;

    navigator.clipboard.writeText(text).then(
      () => {
        this.sb.open($localize`:@@common.copy.success:Copied to clipboard`);
      },
      () => {
        this.sb.open($localize`:@@common.copy.failed:Failed copy to clipboard`);
      }
    );
  }

}
