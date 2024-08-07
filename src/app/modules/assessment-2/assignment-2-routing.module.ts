import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  { path: '', redirectTo: '/assignment-2/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'home', component: LandingComponent },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Assessment2RoutingModule { }