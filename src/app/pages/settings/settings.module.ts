import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from "./settings.component";
import { RouterModule } from "@angular/router";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";



@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: SettingsComponent,
    }]),
    MatExpansionModule,
    MatInputModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class SettingsModule { }
