import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "./not-found.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";


@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: NotFoundComponent,
    }]),
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class NotFoundModule { }
