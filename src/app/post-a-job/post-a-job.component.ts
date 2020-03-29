import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';

import * as skills from './skills.json';
import { JobsService } from '../jobs.service';

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
  selectedSkills = [];
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

  constructor(private jobsService: JobsService) {}

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

    this.jobsService.saveJob(formData);
  }
}
