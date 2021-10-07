import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationComponent } from "./federation.component";
import { RouterModule } from "@angular/router";
import { FederationCardModule } from "../../components/federation-card/federation-card.module";



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
  ],
  exports: [
    RouterModule,
  ]
})
export class FederationModule { }
