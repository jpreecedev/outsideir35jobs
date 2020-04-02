import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html'
})
export class LatestPostsComponent implements OnInit {
  frontEndJobs: PostAJobForm[] = [];
  fullStackJobs: PostAJobForm[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobsService.getXJobs(5).subscribe(data => {
      this.frontEndJobs = data.filter(job => job.category === 'FrontEnd');
      this.fullStackJobs = data.filter(job => job.category === 'FullStack');
    });
  }
}
