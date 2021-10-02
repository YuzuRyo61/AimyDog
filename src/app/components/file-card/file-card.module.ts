import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCardComponent } from "./file-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FileDetailDialogModule } from "../file-detail-dialog/file-detail-dialog.module";



@NgModule({
  declarations: [
    FileCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    FileDetailDialogModule,
  ],
  exports: [
    FileCardComponent,
  ],
})
export class FileCardModule { }
