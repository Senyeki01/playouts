import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './components/match/match.component';
import { TimerComponent } from './components/timer/timer.component';
import { GoalAnimationComponent } from './components/goal-animation/goal-animation.component';
import { LandingComponent } from './components/landing/landing.component';
import { SelectedGameComponent } from './components/selected-game/selected-game.component';
import { MaterialModule } from '../material/material.module';
import { Assessment1RoutingModule } from './assignment-1-routing.module';

@NgModule({
  declarations: [
    MatchComponent,
    TimerComponent,
    GoalAnimationComponent,
    LandingComponent,
    SelectedGameComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    Assessment1RoutingModule
  ]
})
export class Assessment1Module { }
