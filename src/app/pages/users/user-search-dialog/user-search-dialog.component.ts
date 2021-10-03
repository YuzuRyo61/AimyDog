import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './user-search-dialog.component.html',
  styleUrls: ['./user-search-dialog.component.scss']
})
export class UserSearchDialogComponent {
  constructor(
    public ref: MatDialogRef<UserSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
  ) { }

}
