import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import * as skills from './skills.json';
import { JobsService } from '../jobs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.css']
})
export class PostAJobComponent implements OnInit {
  public Editor = ClassicEditor;

  dropdownList = [];
  dropdownSettings = {};
  selectedSkills: Skill[] = [];

  model: PostAJobForm = {
    jobTitle: '',
    category: 'FrontEnd',
    headOfficeLocation: '',
    skills: [],
    rateFrom: '500',
    rateTo: '550',
    jobIs: 'remote',
    frequency: 'Day',
    currency: 'GBP',
    contractLength: 'SixToTwelve',
    companyName: '',
    jobDescription: '',
    whereToApply: '',
    experienceRequired: 'ThreeToFive'
  };

  constructor(
    private jobsService: JobsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dropdownList = (skills as any).default;
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select skills',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      enableSearchFilter: true,
      classes: 'custom-multiselect'
    };
  }

  setEstablishmentAddress({
    formatted_address
  }: {
    formatted_address: string;
  }) {
    this.model.headOfficeLocation = formatted_address;
  }

  postJob(form: NgForm) {
    if (!form.valid) {
      return Promise.reject();
    }

    debugger;

    return this.jobsService
      .saveJob(form.value)
      .then(() => {
        this.toastr.success('We have received your post', 'Job Post');
        this.router.navigate(['/thank-you']);
      })
      .catch(error => {
        this.toastr.error(
          'There was an error submitting your post.  Please try again.',
          'Job Post'
        );
        console.error(error);
      });
  }
}
