import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-emoji-search-dialog',
  templateUrl: './emoji-search-dialog.component.html',
  styleUrls: ['./emoji-search-dialog.component.scss']
})
export class EmojiSearchDialogComponent {

  constructor(
    public ref: MatDialogRef<EmojiSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
  ) { }

}
