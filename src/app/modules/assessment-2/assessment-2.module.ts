import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './components/landing/landing.component';
import { Assessment2RoutingModule } from './assignment-2-routing.module';
import { TreeMenuComponent } from './components/tree-menu/tree-menu.component';



@NgModule({
  declarations: [
    LandingComponent,
    TreeMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    Assessment2RoutingModule
  ]
})
export class Assessment2Module { }
