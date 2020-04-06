import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private firestore: AngularFirestore) {}

  saveJob(job: Job) {
    return this.firestore.collection<Job>('jobs').add(job);
  }

  getJob(id: string) {
    return this.firestore.doc<Job>(`jobs/${id}`).valueChanges();
  }

  getXJobs(count: number) {
    return this.firestore
      .collection<Job>('jobs', (x) => x.where('expires', '>', new Date()))
      .snapshotChanges()
      .pipe(
        map((project) => {
          const allJobs = project
            .map((value) => {
              const data = value.payload.doc.data();
              const documentId = value.payload.doc.id;
              return {
                id: documentId,
                ...data,
              } as Job;
            })
            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            );

          const frontEndJobs = allJobs
            .filter((x) => x.category === 'FrontEnd')
            .slice(0, count);
          const fullStackJobs = allJobs
            .filter((x) => x.category === 'FullStack')
            .slice(0, count);

          return frontEndJobs.concat(fullStackJobs);
        }),

        shareReplay(1)
      );
  }

  getAllJobs() {
    return this.firestore
      .collection<Job>('jobs', (x) => x.where('expires', '>', new Date()))
      .snapshotChanges()
      .pipe(
        map((project) => {
          return project
            .map((value) => {
              const data = value.payload.doc.data();
              const documentId = value.payload.doc.id;

              const job = {
                id: documentId,
                ...data,
              } as Job;

              return job;
            })

            .sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            );
        }),
        shareReplay(1)
      );
  }
}
