import { PostAJobComponent } from './post-a-job.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from '../jobs.service';
import { NgForm } from '@angular/forms';

describe('PostAJobComponent', () => {
  let input: PostAJobForm[] = [];
  let component: PostAJobComponent;

  let mockJobService: JobsService;
  let mockToastrService: ToastrService;
  let mockRouterService: Router;

  beforeEach(() => {
    input = [
      {
        id: '123',
        category: 'FrontEnd',
        companyName: 'test-companyname',
        contractLength: 'OneToThree',
        currency: 'EUR',
        experienceRequired: 'FivePlus',
        frequency: 'Day',
        headOfficeLocation: 'test-headOfficeLocation',
        jobDescription: 'test-jobdescription',
        jobIs: 'onSite',
        jobTitle: 'test-jobtitle',
        rateFrom: 'test-ratefrom',
        rateTo: 'test-rateto',
        skills: [
          { id: 44, display: 'skill1', itemName: 'skill1' },
          { id: 55, display: 'skill2', itemName: 'skill2' },
          { id: 66, display: 'skill3', itemName: 'skill3' }
        ],
        whereToApply: 'test-wheretoapply'
      }
    ];

    mockToastrService = jasmine.createSpyObj(['success', 'error']);

    mockRouterService = jasmine.createSpyObj(['navigate']);
  });

  it('should save the job', done => {
    mockJobService = ({
      saveJob: jasmine
        .createSpy('saveJob')
        .and.callFake((job: PostAJobForm) => {
          input.push(job);
          return Promise.resolve();
        })
    } as any) as JobsService;

    component = new PostAJobComponent(
      mockJobService,
      mockToastrService,
      mockRouterService
    );

    const newJob: PostAJobForm = {
      id: '123',
      category: 'FullStack',
      companyName: 'new-companyname',
      contractLength: 'OneToThree',
      currency: 'EUR',
      experienceRequired: 'FivePlus',
      frequency: 'Day',
      headOfficeLocation: '',
      jobIs: 'remote',
      jobDescription: 'new-jobdescription',
      jobTitle: 'new-jobtitle',
      rateFrom: 'new-ratefrom',
      rateTo: 'new-rateto',
      skills: [
        { id: 44, display: 'skill1', itemName: 'skill1' },
        { id: 55, display: 'skill2', itemName: 'skill2' },
        { id: 66, display: 'skill3', itemName: 'skill3' }
      ],
      whereToApply: 'new-wheretoapply'
    };

    component.jobIs = 'onSite';
    component.headOfficeLocation = 'TEST LOCATION';

    component
      .postJob({
        valid: true,
        value: newJob
      } as NgForm)
      .finally(() => {
        expect(mockToastrService.success).toHaveBeenCalled();
        expect(mockRouterService.navigate).toHaveBeenCalled();
        done();
      });

    expect(mockJobService.saveJob).toHaveBeenCalledWith({
      ...newJob,
      jobIs: component.jobIs,
      headOfficeLocation: component.headOfficeLocation
    });
  });

  it('should fail to save the job', done => {
    mockJobService = ({
      saveJob: jasmine
        .createSpy('saveJob')
        .and.callFake((job: PostAJobForm) => {
          return Promise.reject('Cos reasons');
        })
    } as any) as JobsService;

    component = new PostAJobComponent(
      mockJobService,
      mockToastrService,
      mockRouterService
    );

    const newJob: PostAJobForm = {
      id: '123',
      category: 'FullStack',
      companyName: 'new-companyname',
      contractLength: 'OneToThree',
      currency: 'EUR',
      experienceRequired: 'FivePlus',
      frequency: 'Day',
      headOfficeLocation: '',
      jobIs: 'remote',
      jobDescription: 'new-jobdescription',
      jobTitle: 'new-jobtitle',
      rateFrom: 'new-ratefrom',
      rateTo: 'new-rateto',
      skills: [
        { id: 44, display: 'skill1', itemName: 'skill1' },
        { id: 55, display: 'skill2', itemName: 'skill2' },
        { id: 66, display: 'skill3', itemName: 'skill3' }
      ],
      whereToApply: 'new-wheretoapply'
    };

    component.jobIs = 'onSite';
    component.headOfficeLocation = 'TEST LOCATION';

    component
      .postJob({
        valid: true,
        value: newJob
      } as NgForm)
      .finally(() => {
        expect(mockToastrService.success).not.toHaveBeenCalled();
        expect(mockToastrService.error).toHaveBeenCalled();
        expect(mockRouterService.navigate).not.toHaveBeenCalled();
        done();
      });

    expect(mockJobService.saveJob).toHaveBeenCalledWith({
      ...newJob,
      jobIs: component.jobIs,
      headOfficeLocation: component.headOfficeLocation
    });
  });
});
