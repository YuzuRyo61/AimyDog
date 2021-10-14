import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiEditDialogComponent } from "./emoji-edit-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { YnDialogModule } from "../yn-dialog/yn-dialog.module";



@NgModule({
  declarations: [
    EmojiEditDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatIconModule,
    YnDialogModule,
  ],
  exports: [
    EmojiEditDialogComponent,
  ]
})
export class EmojiEditDialogModule { }
