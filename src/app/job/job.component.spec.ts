import { JobComponent } from './job.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('JobComponent', () => {
  let input: PostAJobForm[] = [];
  let component: JobComponent;

  let mockActivatedRoute: ActivatedRoute;
  let mockJobService;

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

    mockJobService = {
      getJob: jasmine.createSpy('getJob').and.callFake((id: string) => {
        return of(input.find(x => x.id === id));
      })
    };
    mockActivatedRoute = {
      snapshot: {
        params: {
          id: '123'
        }
      }
    } as any;

    component = new JobComponent(mockJobService, mockActivatedRoute);
  });

  it('should set the job', () => {
    component.ngOnInit();

    expect(component.job).toBe(input[0]);
  });
});
