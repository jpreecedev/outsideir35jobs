import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { JobsComponent } from './jobs/jobs.component';
import { PostAJobComponent } from './post-a-job/post-a-job.component';
import { JobComponent } from './job/job.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'job/:id', component: JobComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'post-a-job', component: PostAJobComponent },
  { path: 'thank-you', component: ThankYouComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
