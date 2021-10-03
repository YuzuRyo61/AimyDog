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

}
