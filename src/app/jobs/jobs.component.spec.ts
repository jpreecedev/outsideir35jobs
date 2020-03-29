import { JobsComponent } from './jobs.component';
import { of } from 'rxjs';
import { JobsService } from '../jobs.service';

describe('JobsComponent', () => {
  let input: PostAJobForm[] = [];
  let component: JobsComponent;

  let mockJobService: JobsService;

  beforeEach(() => {
    input = [
      {
        category: 'FrontEnd'
      } as PostAJobForm,
      {
        category: 'FullStack'
      } as PostAJobForm
    ];

    mockJobService = ({
      getAllJobs: jasmine.createSpy('getAllJobs').and.callFake(() => {
        return of(input);
      })
    } as any) as JobsService;

    component = new JobsComponent(mockJobService);
  });

  it('should set frontEndJobs to 1 and fullStackJobs to 1', () => {
    component.ngOnInit();

    expect(component.frontEndJobs.length).toBe(1);
    expect(component.fullStackJobs.length).toBe(1);
  });
});
