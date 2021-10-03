import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDetailDialogComponent } from "./file-detail-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { UserDetailDialogModule } from "../user-detail-dialog/user-detail-dialog.module";
import { YnDialogModule } from "../yn-dialog/yn-dialog.module";



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
    MatTooltipModule,
    UserDetailDialogModule,
    YnDialogModule,
  ],
  exports: [
    FileDetailDialogComponent
  ]
})
export class FileDetailDialogModule { }
