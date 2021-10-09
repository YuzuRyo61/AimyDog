import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationCardComponent } from "./federation-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";



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
  ],
  exports: [
    FederationCardComponent,
  ]
})
export class FederationCardModule { }
