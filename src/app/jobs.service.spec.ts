import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

import { JobsService } from './jobs.service';

describe('JobsService tests', () => {
  let service: JobsService;
  let angularFirestore: AngularFirestore;

  let input: PostAJobForm[] = [];

  const firestoreStub = {
    doc: jasmine.createSpy('doc').and.callFake((arg: string) => ({
      valueChanges: () =>
        of(input.find(x => x.id === arg.substr(arg.indexOf('/') + 1)))
    })),
    collection: jasmine.createSpy('collection').and.callFake(() => ({
      snapshotChanges: () =>
        of([
          {
            payload: {
              doc: {
                data: () => input[0],
                id: input[0].id
              }
            }
          }
        ]),
      add: payload => {
        input.push(payload);
        return Promise.resolve();
      }
    }))
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JobsService,
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    });

    service = TestBed.inject(JobsService);
    angularFirestore = TestBed.inject(AngularFirestore);

    input = [
      {
        id: 'test-123',
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a job', done => {
    service.getJob('test-123').subscribe(data => {
      expect(data).toEqual(input[0]);
      expect(firestoreStub.doc).toHaveBeenCalledWith('jobs/test-123');
      done();
    });
  });

  it('should not get a job with an invalid id', done => {
    service.getJob('test-444').subscribe(data => {
      expect(data).toBeUndefined();
      expect(firestoreStub.doc).toHaveBeenCalledWith('jobs/test-444');
      done();
    });
  });

  it('should get all jobs', done => {
    service.getAllJobs().subscribe(data => {
      expect(data).toEqual(input);
      done();
    });
  });

  it('should save the job', done => {
    const newJob: PostAJobForm = {
      id: 'new-test-123',
      category: 'FrontEnd',
      companyName: 'new-test-companyname',
      contractLength: 'OneToThree',
      currency: 'EUR',
      experienceRequired: 'FivePlus',
      frequency: 'Day',
      headOfficeLocation: 'new-test-headOfficeLocation',
      jobDescription: 'new-test-jobdescription',
      jobIs: 'onSite',
      jobTitle: 'new-test-jobtitle',
      rateFrom: 'new-test-ratefrom',
      rateTo: 'new-test-rateto',
      skills: [
        { id: 44, display: 'skill1', itemName: 'skill1' },
        { id: 55, display: 'skill2', itemName: 'skill2' },
        { id: 66, display: 'skill3', itemName: 'skill3' }
      ],
      whereToApply: 'test-wheretoapply'
    };

    service.saveJob(newJob).then(() => {
      expect(input.length).toBe(2);
      done();
    });
  });
});
