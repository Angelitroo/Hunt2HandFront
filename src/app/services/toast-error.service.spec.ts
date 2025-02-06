import { TestBed } from '@angular/core/testing';

import { ToastErrorService } from './toast-error.service';

describe('ToastErrorService', () => {
  let service: ToastErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
