import { Component, Inject } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-federation-search-dialog',
  templateUrl: './federation-search-dialog.component.html',
  styleUrls: ['./federation-search-dialog.component.scss']
})
export class FederationSearchDialogComponent {

  constructor(
    public ref: MatDialogRef<FederationSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
  ) { }

}
