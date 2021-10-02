import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileCardComponent } from "./file-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";



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
  ],
  exports: [
    FileCardComponent,
  ],
})
export class FileCardModule { }
