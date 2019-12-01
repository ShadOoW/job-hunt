import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

// Services
import { JobsService } from '../../../services/jobs.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class DashboardPostComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  id: string;
  getSubscription: Subscription;

  constructor(
    private jobsService: JobsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      location: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });

    this.route.params.subscribe(params => {
      this.id = params.id;
      if (this.id) {
        this.getSubscription = this.jobsService.get(this.id).subscribe(job => {
          this.validateForm.controls.title.setValue(job.payload.get('title'));
          this.validateForm.controls.location.setValue(job.payload.get('location'));
          this.validateForm.controls.description.setValue(job.payload.get('description'));
          const date = job.payload.get('date');
          this.validateForm.controls.date.setValue(new Timestamp(date.seconds, date.nanoseconds).toDate());
        });
      }
    });
  }

  submitForm(): void {
    for (const field of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[field].markAsDirty();
      this.validateForm.controls[field].updateValueAndValidity();
    }

    if (!this.validateForm.invalid) {
      if (this.id) {
        this.jobsService.update(
          this.id,
          this.validateForm.value,
        ).then(() => {
          this.router.navigate(['dashboard/list']);
        });
      } else {
        this.jobsService.create(
          this.validateForm.value,
          this.authService.userData.email
        ).then(() => {
          this.router.navigate(['dashboard/list']);
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
  }
}
