import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { LandingComponent } from './landing/landing.component';
import { JobsComponent } from './jobs/jobs.component';
import { PostAJobComponent } from './post-a-job/post-a-job.component';
import { JobComponent } from './job/job.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'job/:id', component: JobComponent },
  { path: 'jobs', component: JobsComponent },
  {
    path: 'post-a-job',
    component: PostAJobComponent,
    ...canActivate(() => redirectUnauthorizedTo(['sign-in']))
  },
  { path: 'thank-you', component: ThankYouComponent },
  { path: 'sign-in', component: SignInComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
