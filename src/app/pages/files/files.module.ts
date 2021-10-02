import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from "./files.component";
import { RouterModule } from "@angular/router";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { FileCardModule } from "../../components/file-card/file-card.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";



@NgModule({
  declarations: [
    FilesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: FilesComponent,
    }]),
    VirtualScrollerModule,
    FileCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class FilesModule { }
