import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(public db: AngularFirestore) {}

  get(id) {
    return this.db.collection('jobs').doc(id).snapshotChanges();
  }

  close(id) {
    return this.db.collection('jobs').doc(id).update({status: 'close'});
  }

  open(id) {
    return this.db.collection('jobs').doc(id).update({status: 'open'});
  }

  update(id, value) {
    return this.db.collection('jobs').doc(id).update(value);
  }

  delete(id) {
    return this.db.collection('jobs').doc(id).delete();
  }

  list(author) {
    return this.db.collection(
      'jobs',
      ref => ref.where('author', '==', author)
    ).snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  create(value, author) {
    const date = new Date();

    return this.db.collection('jobs').add({
      title: value.title,
      titleToSearch: value.title.toLowerCase(),
      location: value.location,
      description: value.description,
      date: value.date,
      author,
      status: 'open',
      created: date,
      updated: date,
    });
  }
}
