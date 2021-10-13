import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FederationComponent } from "./federation.component";
import { RouterModule } from "@angular/router";
import { FederationCardModule } from "../../components/federation-card/federation-card.module";
import { VirtualScrollerModule } from "ngx-virtual-scroller";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FederationSearchDialogComponent } from './federation-search-dialog/federation-search-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";


@NgModule({
  declarations: [
    FederationComponent,
    FederationSearchDialogComponent,
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
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class FederationModule {
}
