import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDetailDialogComponent } from "./file-detail-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";



@NgModule({
  declarations: [
    FileDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    FileDetailDialogComponent
  ]
})
export class FileDetailDialogModule { }
