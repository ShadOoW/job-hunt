import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(public db: AngularFirestore) {}

  list() {
    return this.db.collection(
      'jobs',
      ref => ref.where('status', '==', 'open')
    ).snapshotChanges();
  }
}
