import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRelationListDialogComponent } from "./user-relation-list-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";



@NgModule({
  declarations: [
    UserRelationListDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    VirtualScrollerModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  exports: [
    UserRelationListDialogComponent,
  ]
})
export class UserRelationListDialogModule { }
