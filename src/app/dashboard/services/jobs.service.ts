import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(public db: AngularFirestore) {}

  getAvatars() {
    return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey) {
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  closeJob(id) {
    return this.db.collection('jobs').doc(id).update({status: 'close'});
  }

  openJob(id) {
    return this.db.collection('jobs').doc(id).update({status: 'open'});
  }

  deleteUser(userKey) {
    return this.db.collection('users').doc(userKey).delete();
  }

  getUsers() {
    return this.db.collection('users').snapshotChanges();
  }

  getJobs(author) {
    return this.db.collection(
      'jobs',
      ref => ref.where('author', '==', author)
    ).snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db.collection('users', ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

  createJob(value, author) {
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
