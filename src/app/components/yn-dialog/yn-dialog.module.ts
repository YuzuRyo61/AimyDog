import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YnDialogComponent } from "./yn-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [
    YnDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    YnDialogComponent,
  ]
})
export class YnDialogModule { }
