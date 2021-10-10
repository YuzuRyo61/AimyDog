import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationComponent } from "./federation.component";
import { RouterModule } from "@angular/router";
import { FederationCardModule } from "../../components/federation-card/federation-card.module";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";



@NgModule({
  declarations: [
    FederationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: FederationComponent,
    }]),
    FederationCardModule,
    VirtualScrollerModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class FederationModule { }
