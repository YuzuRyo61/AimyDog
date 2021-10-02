import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from "@angular/material/badge";
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatListModule } from "@angular/material/list";
import { ReactiveFormsModule } from "@angular/forms";
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { MkApiService } from "../../service/mk-api.service";
import { UserDetailDialogModule } from "../../components/user-detail-dialog/user-detail-dialog.module";


@NgModule({
  declarations: [
    UsersComponent,
    SearchDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      },
    ]),
    ReactiveFormsModule,
    FlexLayoutModule,
    UserDetailDialogModule,

    MatCardModule,
    MatBadgeModule,
    MatChipsModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    VirtualScrollerModule,
    MatListModule,
  ],
  providers: [
    MkApiService,
  ],
  exports: [
    RouterModule,
  ],
})
export class UsersModule {
}
