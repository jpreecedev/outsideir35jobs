import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {
  job: PostAJobForm;

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.jobsService.getJob(this.route.snapshot.params.id).subscribe(job => {
      this.job = job;
    });
  }
}
