import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { JobsService } from './jobs.service';

describe('JobsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: AngularFirestore},
    ]
  }));

  it('should be created', () => {
    const service: JobsService = TestBed.get(JobsService);
    expect(service).toBeTruthy();
  });
});
