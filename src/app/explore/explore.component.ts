import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import en from 'javascript-time-ago/locale/en';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import TimeAgo from 'javascript-time-ago';
TimeAgo.addLocale(en);

// Models
import { Job } from '../models/job';

// Services
import { JobsService } from './services/jobs.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {
  jobs: Array<Job & {timeAgo: string}> = [];
  isLoading = true;
  timeAgo: TimeAgo;
  listSubscription: Subscription;
  searchSubscription: Subscription;

  constructor(
    public jobsService: JobsService,
  ) {
    this.timeAgo = new TimeAgo('en-US');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.listSubscription = this.jobsService.list().subscribe(results => {
      this.buildJobs(results);
      this.isLoading = false;
    });
  }

  // Firebase doesn't support substring contain search
  // Client side work around, list then filter result.
  search(searchValue: string) {
    this.isLoading = true;
    if (!searchValue) { searchValue = ''; }
    this.searchSubscription = this.jobsService.list().subscribe(results => {
      this.buildJobs(results, searchValue);
      this.isLoading = false;
    });
  }

  private buildJobs(results, filter: string = '') {
    this.jobs = [];

    results.forEach(result => {
      const job = new Job({
        ...result.payload.doc.data(),
        id: result.payload.doc.id,
      } as Job);

      if (filter.length > 0) {
        if (job.titleToSearch.includes(filter)) {
          this.addJob(job);
        }
      } else {
        this.addJob(job);
      }
    });
  }

  private addJob(job: Job) {
    this.jobs.push(
      {
        ...job,
        timeAgo: this.timeAgo.format(
          new Timestamp(job.date.seconds, job.date.nanoseconds).toDate()
        )
      }
    );
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    this.listSubscription.unsubscribe();
  }
}
