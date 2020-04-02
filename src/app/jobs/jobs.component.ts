import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent implements OnInit {
  frontEndJobs: PostAJobForm[] = [];
  fullStackJobs: PostAJobForm[] = [];

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    this.jobsService.getAllJobs().subscribe(data => {
      this.frontEndJobs = data.filter(job => job.category === 'FrontEnd');
      this.fullStackJobs = data.filter(job => job.category === 'FullStack');
    });
  }
}
