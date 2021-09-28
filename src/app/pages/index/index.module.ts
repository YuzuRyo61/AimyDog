import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {IndexComponent} from "./index.component";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    IndexComponent,
  ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: IndexComponent
        }]),
        MatCardModule,
    ],
  exports: [
    RouterModule,
  ]
})
export class IndexModule { }
