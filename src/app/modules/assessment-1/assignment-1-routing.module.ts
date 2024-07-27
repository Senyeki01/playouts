import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { LandingComponent } from './components/landing/landing.component';
import { SelectedGameComponent } from './components/selected-game/selected-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/assignment-1/landing', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'landing', component: LandingComponent },
  { path: 'game/:id', component: SelectedGameComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Assessment1RoutingModule { }