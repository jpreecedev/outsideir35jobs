import { LatestPostsComponent } from './latest-posts.component';
import { of } from 'rxjs';
import { JobsService } from '../jobs.service';

describe('LatestPosts', () => {
  let input: PostAJobForm[] = [];
  let component: LatestPostsComponent;

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
      getXJobs: jasmine.createSpy('getXJobs').and.callFake(() => {
        return of(input);
      })
    } as any) as JobsService;

    component = new LatestPostsComponent(mockJobService);
  });

  it('should set frontEndJobs to 1 and fullStackJobs to 1', () => {
    component.ngOnInit();

    expect(component.frontEndJobs.length).toBe(1);
    expect(component.fullStackJobs.length).toBe(1);
  });
});
