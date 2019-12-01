import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { JobsService } from '../../../services/jobs.service';
import { AuthService } from '../../../services/auth.service';

// Models
import { Job } from './../../../models/job';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DashboardListComponent implements OnInit, OnDestroy {
  jobs: Array<Job>;
  isLoading = true;

  // Subscriptions
  listSubscription: Subscription;

  constructor(
    public jobsService: JobsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listSubscription = this.jobsService.listByAuthor(this.authService.userEmail)
    .subscribe(results => {
      this.isLoading = true;
      this.jobs = [];
      results.forEach(result => {
        this.jobs.push(
          new Job({
            ...result.payload.doc.data(),
            id: result.payload.doc.id,
          } as Job),
        );
      });

      this.isLoading = false;
    });
  }

  edit(id: string): void {
    this.router.navigate(['/dashboard/edit', id]);
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
