import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './components/landing/landing.component';
import { Assessment2RoutingModule } from './assignment-2-routing.module';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    Assessment2RoutingModule
  ]
})
export class Assessment2Module { }
