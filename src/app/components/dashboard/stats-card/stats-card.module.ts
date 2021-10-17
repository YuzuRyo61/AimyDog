import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from "./stats-card.component";
import { MatCardModule } from "@angular/material/card";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    StatsCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    RouterModule,
  ],
  exports: [
    StatsCardComponent,
  ]
})
export class StatsCardModule { }
