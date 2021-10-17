import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SrvInfoCardComponent } from "./srv-info-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [
    SrvInfoCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    SrvInfoCardComponent,
  ]
})
export class SrvInfoCardModule { }
