import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";
import {MatGridListModule} from "@angular/material/grid-list";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import { MatDialogModule } from '@angular/material/dialog';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {VirtualScrollerModule} from "ngx-virtual-scroller";
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [
    UsersComponent,
    SearchDialogComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: UsersComponent,
    }]),

    FlexLayoutModule,
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
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}}
  ],
  exports: [
    RouterModule,
  ],
})
export class UsersModule { }
