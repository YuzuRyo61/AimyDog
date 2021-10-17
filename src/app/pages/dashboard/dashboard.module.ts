import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { StatsCardModule } from "../../components/dashboard/stats-card/stats-card.module";
import { ModLogCardModule } from "../../components/dashboard/mod-log-card/mod-log-card.module";
import { MatDividerModule } from "@angular/material/divider";
import { SrvInfoCardModule } from "../../components/dashboard/srv-info-card/srv-info-card.module";



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardComponent,
    }]),
    FlexLayoutModule,
    StatsCardModule,
    ModLogCardModule,
    MatDividerModule,
    SrvInfoCardModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class DashboardModule { }
