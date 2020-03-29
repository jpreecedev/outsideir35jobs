import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(private firestore: AngularFirestore) {}

  saveJob(job: PostAJobForm) {
    return this.firestore.collection<PostAJobForm>('jobs').add(job);
  }

  getJob(id: string) {
    return this.firestore.doc<PostAJobForm>(`jobs/${id}`).valueChanges();
  }

  getAllJobs() {
    return this.firestore
      .collection<PostAJobForm>('jobs')
      .snapshotChanges()
      .pipe(
        map(project => {
          return project.map(value => {
            const data = value.payload.doc.data();
            const documentId = value.payload.doc.id;
            return <PostAJobForm>{
              id: documentId,
              ...data
            };
          });
        })
      );
  }
}
