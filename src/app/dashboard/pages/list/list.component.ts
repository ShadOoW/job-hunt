import { Component, OnInit } from '@angular/core';
import { JobsService } from '../../services/jobs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DashboardListComponent implements OnInit {
  jobs: Array<any>;

  constructor(
    public jobsService: JobsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.jobsService.list(this.authService.user)
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
