import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from "./files.component";
import { RouterModule } from "@angular/router";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { FileCardModule } from "../../components/file-card/file-card.module";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FileSearchDialogComponent } from "./file-search-dialog/file-search-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { EmojiEditDialogModule } from "../../components/emoji-edit-dialog/emoji-edit-dialog.module";


@NgModule({
  declarations: [
    FilesComponent,
    FileSearchDialogComponent,
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
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    EmojiEditDialogModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class FilesModule {
}
