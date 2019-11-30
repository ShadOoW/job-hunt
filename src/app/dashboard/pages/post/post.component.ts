import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-dashboard-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class DashboardPostComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    console.log(this.validateForm);
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (!this.validateForm.invalid) {
      this.jobsService.createJob(this.validateForm.value);
    }
  }

  constructor(
    private jobsService: JobsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      location: [null, [Validators.required]],
      description: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
