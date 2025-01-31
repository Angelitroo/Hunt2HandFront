import { TestBed } from '@angular/core/testing';

import { ReseñaServiceService } from './reseña-service.service';

describe('ReseñaServiceService', () => {
  let service: ReseñaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReseñaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
