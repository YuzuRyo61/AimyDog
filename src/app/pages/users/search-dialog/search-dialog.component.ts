import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent {
  constructor(
    public ref: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
  ) {
  }

}
