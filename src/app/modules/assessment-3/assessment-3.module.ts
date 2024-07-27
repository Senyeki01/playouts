import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { LandingComponent } from './components/landing/landing.component';
import { Assessment3RoutingModule } from './assignment-3-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    Assessment3RoutingModule,
    HttpClientModule
  ]
})
export class Assessment3Module { }
