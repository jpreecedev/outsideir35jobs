import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'jobs', component: JobsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
