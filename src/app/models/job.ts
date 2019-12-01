
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

export class Job {
  id: string;
  title: string;
  titleToSearch: string;
  location: string;
  description: string;
  date: Timestamp;

  constructor(json: Job = {} as Job) {
    this.id = json.id || '';
    this.title = json.title || '';
    this.titleToSearch = json.titleToSearch || '';
    this.location = json.location || '';
    this.description = json.description || '';
    this.date = json.date;
  }
}
