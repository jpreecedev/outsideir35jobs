import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { JobsComponent } from './jobs/jobs.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
