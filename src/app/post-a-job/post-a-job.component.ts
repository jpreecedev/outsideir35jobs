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
export class PostAJobComponent implements OnInit, PostAJobForm {
  public Editor = ClassicEditor;

  dropdownList = [];
  dropdownSettings = {};

  jobTitle: string = '';
  category: Category = 'FrontEnd';
  headOfficeLocation: string = '';
  selectedSkills: Skill[] = [];
  skills: Skill[] = [];
  rateFrom: string = '500';
  rateTo: string = '550';
  jobIs: JobIs = 'remote';
  frequency: Frequency = 'Day';
  currency: Currency = 'GBP';
  contractLength: ContractLength = 'SixToTwelve';
  companyName: string = '';
  jobDescription: string = '';
  whereToApply: string = '';
  experienceRequired: ExperienceRequired = 'ThreeToFive';

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
    this.headOfficeLocation = formatted_address;
  }

  postJob(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const formData = {
      ...form.value,
      jobIs: this.jobIs,
      headOfficeLocation: this.headOfficeLocation
    };

    this.jobsService
      .saveJob(formData)
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
