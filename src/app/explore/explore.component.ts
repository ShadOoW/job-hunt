import { Component, OnInit } from '@angular/core';

// Services
import { JobsService } from './services/jobs.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  jobs: Array<any>;

  constructor(
    public jobsService: JobsService,
  ) {}

  ngOnInit(): void {
    this.jobsService.list()
    .subscribe(results => {
      this.jobs = [];
      results.forEach(result => {
        this.jobs.push(
          {
            ...result.payload.doc.data(),
            id: result.payload.doc.id,
          },
        );
      });
    });
  }
}
