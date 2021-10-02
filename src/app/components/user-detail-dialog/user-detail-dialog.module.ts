import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailDialogComponent } from "./user-detail-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { YnDialogModule } from "../yn-dialog/yn-dialog.module";



@NgModule({
  declarations: [
    UserDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    YnDialogModule,
  ],
  exports: [
    UserDetailDialogComponent,
  ]
})
export class UserDetailDialogModule { }
