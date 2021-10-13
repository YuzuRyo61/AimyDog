import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationDetailDialogComponent } from "./federation-detail-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { YnDialogModule } from "../yn-dialog/yn-dialog.module";



@NgModule({
  declarations: [
    FederationDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatTooltipModule,
    YnDialogModule,
  ],
  exports: [
    FederationDetailDialogComponent,
  ]
})
export class FederationDetailDialogModule { }
