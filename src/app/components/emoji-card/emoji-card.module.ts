import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiCardComponent } from "./emoji-card.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";



@NgModule({
  declarations: [
    EmojiCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
  ],
  exports: [
    EmojiCardComponent,
  ]
})
export class EmojiCardModule { }
