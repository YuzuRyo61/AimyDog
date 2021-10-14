import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmojiComponent } from "./emoji.component";
import { RouterModule } from "@angular/router";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EmojiCardModule } from "../../components/emoji-card/emoji-card.module";
import { EmojiSearchDialogComponent } from './emoji-search-dialog/emoji-search-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";



@NgModule({
  declarations: [
    EmojiComponent,
    EmojiSearchDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: EmojiComponent,
    }]),
    VirtualScrollerModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    EmojiCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class EmojiModule { }
