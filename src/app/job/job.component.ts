import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html'
})
export class JobComponent {
  job$ = this.jobsService.getJob(this.route.snapshot.params.id);

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute
  ) {}
}
