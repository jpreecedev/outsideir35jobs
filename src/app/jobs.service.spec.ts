import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

import { JobsService } from './jobs.service';

function getExpirationDate() {
  var date = new Date(1586158122218);
  date.setDate(date.getDate() + 30);
  return date;
}

describe('JobsService tests', () => {
  let service: JobsService;
  let angularFirestore: AngularFirestore;

  let input: Job[] = [];

  const firestoreStub = {
    doc: jasmine.createSpy('doc').and.callFake((arg: string) => ({
      valueChanges: () =>
        of(input.find((x) => x.id === arg.substr(arg.indexOf('/') + 1))),
    })),
    collection: jasmine.createSpy('collection').and.callFake(() => ({
      snapshotChanges: () =>
        of(
          input.map((item) => ({
            payload: {
              doc: {
                data: () => item,
              },
            },
          }))
        ),
      add: (payload) => {
        input.push(payload);
        return Promise.resolve();
      },
    })),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JobsService,
        { provide: AngularFirestore, useValue: firestoreStub },
      ],
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
          { id: 66, display: 'skill3', itemName: 'skill3' },
        ],
        whereToApply: 'test-wheretoapply',
        created: new Date(),
        expires: getExpirationDate(),
      },
      {
        id: 'test-456',
        category: 'FullStack',
        companyName: 'test456-companyname',
        contractLength: 'SixToTwelve',
        currency: 'USD',
        experienceRequired: 'OneYearOrLess',
        frequency: 'Hour',
        headOfficeLocation: 'test456-headOfficeLocation',
        jobDescription: 'test456-jobdescription',
        jobIs: 'remote',
        jobTitle: 'test456-jobtitle',
        rateFrom: 'test456-ratefrom',
        rateTo: 'test456-rateto',
        skills: [
          { id: 22, display: 'skill1', itemName: 'skill1' },
          { id: 33, display: 'skill2', itemName: 'skill2' },
        ],
        whereToApply: 'test456-wheretoapply',
        created: new Date(1586158122218),
        expires: getExpirationDate(),
      },
      {
        id: 'test-789',
        category: 'FrontEnd',
        companyName: 'test789-companyname',
        contractLength: 'SixToTwelve',
        currency: 'USD',
        experienceRequired: 'OneYearOrLess',
        frequency: 'Hour',
        headOfficeLocation: 'test789-headOfficeLocation',
        jobDescription: 'test789-jobdescription',
        jobIs: 'remote',
        jobTitle: 'test789-jobtitle',
        rateFrom: 'test789-ratefrom',
        rateTo: 'test789-rateto',
        skills: [
          { id: 22, display: 'skill1', itemName: 'skill1' },
          { id: 33, display: 'skill2', itemName: 'skill2' },
        ],
        whereToApply: 'test456-wheretoapply',
        created: new Date(1586158122218),
        expires: getExpirationDate(),
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a job', (done) => {
    service.getJob('test-123').subscribe((data) => {
      expect(data).toEqual(input[0]);
      expect(firestoreStub.doc).toHaveBeenCalledWith('jobs/test-123');
      done();
    });
  });

  it('should not get a job with an invalid id', (done) => {
    service.getJob('test-444').subscribe((data) => {
      expect(data).toBeUndefined();
      expect(firestoreStub.doc).toHaveBeenCalledWith('jobs/test-444');
      done();
    });
  });

  it('should get all jobs', (done) => {
    service.getAllJobs().subscribe((data) => {
      expect(data).toEqual(input);
      done();
    });
  });

  it('should get 2 jobs (1 front-end, 1 full-stack)', (done) => {
    service.getXJobs(1).subscribe((data) => {
      expect(data.length).toEqual(2);
      expect(data[0].id).toEqual('test-123');
      expect(data[1].id).toEqual('test-456');
      done();
    });
  });

  it('should save the job', (done) => {
    const newJob: Job = {
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
        { id: 66, display: 'skill3', itemName: 'skill3' },
      ],
      whereToApply: 'test-wheretoapply',
      created: new Date(1586158122218),
      expires: getExpirationDate(),
    };

    service.saveJob(newJob).then(() => {
      expect(input.length).toBe(4);
      done();
    });
  });
});
