import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-report-search-dialog',
  templateUrl: './report-search-dialog.component.html',
  styleUrls: ['./report-search-dialog.component.scss']
})
export class ReportSearchDialogComponent {
  constructor(
    public ref: MatDialogRef<ReportSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormGroup,
  ) { }

}
