import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationCardComponent } from "./federation-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { FederationDetailDialogModule } from "../federation-detail-dialog/federation-detail-dialog.module";
import { MatChipsModule } from "@angular/material/chips";



@NgModule({
  declarations: [
    FederationCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    FederationDetailDialogModule,
    MatChipsModule,
  ],
  exports: [
    FederationCardComponent,
  ]
})
export class FederationCardModule { }
