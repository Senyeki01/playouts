import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/assignment-1/home', pathMatch: 'full' }, // redirect to `first-component`
  {
    path: 'assignment-1',
    loadChildren: () => import('./modules/assessment-1/assessment-1.module').then(module => module.Assessment1Module)
  },
  {
    path: 'assignment-2',
    loadChildren: () => import('./modules/assessment-2/assessment-2.module').then(module => module.Assessment2Module)
  },
  {
    path: 'assignment-3',
    loadChildren: () => import('./modules/assessment-3/assessment-3.module').then(module => module.Assessment3Module)
  },
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }