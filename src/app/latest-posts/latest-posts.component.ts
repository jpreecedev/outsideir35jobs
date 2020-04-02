import { Component } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html'
})
export class LatestPostsComponent {
  allJobs$ = this.jobsService.getXJobs(5);

  constructor(private jobsService: JobsService) {}
}
