import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModLogCardComponent } from "./mod-log-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [
    ModLogCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatIconModule,
    VirtualScrollerModule,
  ],
  exports: [
    ModLogCardComponent,
  ]
})
export class ModLogCardModule { }
