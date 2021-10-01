import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from "./files.component";
import { RouterModule } from "@angular/router";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FileCardComponent } from "../../components/file-card/file-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule } from "@angular/material/chips";
import { MatListModule } from "@angular/material/list";



@NgModule({
  declarations: [
    FilesComponent,
    FileCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: FilesComponent,
    }]),
    VirtualScrollerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatChipsModule,
    MatListModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class FilesModule { }
