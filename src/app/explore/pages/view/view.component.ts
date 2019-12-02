import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import en from 'javascript-time-ago/locale/en';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import TimeAgo from 'javascript-time-ago';
TimeAgo.addLocale(en);

// Models
import { Job } from '../../../models/job';

// Services
import { JobsService } from './../../../services/jobs.service';

@Component({
  selector: 'app-explore-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ExploreViewComponent implements OnInit, OnDestroy {
  job: Job & {timeAgo: string};
  isLoading = true;
  found = false;
  timeAgo: TimeAgo;
  getSubscription: Subscription;
  searchSubscription: Subscription;
  searchValue: '';

  constructor(
    public jobsService: JobsService,
    private route: ActivatedRoute,
  ) {
    this.timeAgo = new TimeAgo('en-US');
    this.job = {...new Job(), timeAgo: ''};
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe(params => {
      if (params.id) {
        this.getSubscription = this.jobsService.get(params.id).subscribe(job => {
          if (job.payload.exists) {
            this.found = true;
            this.addJob(job.payload.data(), job.payload.id);
          } else {
            this.found = false;
          }
          this.isLoading = false;
        });
      }
    });
  }

  private addJob(result, id) {
    const job = new Job({
      ...result,
      id,
    } as Job);

    this.job = {
      ...job,
      timeAgo: this.timeAgo.format(
        new Timestamp(job.date.seconds, job.date.nanoseconds).toDate()
      )
    };
  }

  ngOnDestroy(): void {
    this.getSubscription.unsubscribe();
  }
}
