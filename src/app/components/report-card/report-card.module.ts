import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCardComponent } from "./report-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatDialogModule } from "@angular/material/dialog";
import { UserDetailDialogModule } from "../user-detail-dialog/user-detail-dialog.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { YnDialogModule } from "../yn-dialog/yn-dialog.module";



@NgModule({
  declarations: [
    ReportCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    UserDetailDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    YnDialogModule,
  ],
  exports: [
    ReportCardComponent,
  ]
})
export class ReportCardModule { }
