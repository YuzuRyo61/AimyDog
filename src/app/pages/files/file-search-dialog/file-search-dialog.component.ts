import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './file-search-dialog.component.html',
  styleUrls: ['./file-search-dialog.component.scss']
})
export class FileSearchDialogComponent {
  constructor(
    public ref: MatDialogRef<FileSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
  ) { }

  // エンドポイントの正規表現が不適切なため、一部MIMEしか使えない
  fileTypeSuggest: string[] = [
    'image/png',
    'image/jpeg',
    'image/gif',
    // 'image/svg+xml',
    'image/bmp',
    // 'audio/vnd.wave',
    'audio/x-wav',
    'audio/mpeg',
    'video/mp4',
    'video/ogg',
    'video/x-ms-wmv',
    'application/octet-stream',
  ];
}
