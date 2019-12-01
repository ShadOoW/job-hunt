import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { JobsService } from '../../services/jobs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class DashboardListComponent implements OnInit, OnDestroy {
  jobs: Array<any>;

  // Subscriptions
  listSubscription: Subscription;

  constructor(
    public jobsService: JobsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listSubscription = this.jobsService.list(this.authService.user)
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

  edit(id: string): void {
    this.router.navigate(['/dashboard/edit', id]);
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }
}
