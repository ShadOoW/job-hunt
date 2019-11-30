import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class DashboardPostComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const field of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[field].markAsDirty();
      this.validateForm.controls[field].updateValueAndValidity();
    }

    if (!this.validateForm.invalid) {
      this.jobsService.createJob(
        this.validateForm.value,
        this.authService.userData.email
      ).then(() => {
        this.router.navigate(['dashboard/list']);
      });
    }
  }

  constructor(
    private jobsService: JobsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      location: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
  }
}
