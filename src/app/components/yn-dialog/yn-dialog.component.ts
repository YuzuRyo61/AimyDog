import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { YnDialogData } from "../../interface/yn-dialog-data";

@Component({
  selector: 'app-yn-dialog',
  templateUrl: './yn-dialog.component.html',
  styleUrls: ['./yn-dialog.component.scss']
})
export class YnDialogComponent {

  constructor(
    public ref: MatDialogRef<YnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: YnDialogData,
  ) { }

}
