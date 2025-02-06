import { TestBed } from '@angular/core/testing';

import { ToastOkService } from './toast-ok.service';

describe('ToastOkService', () => {
  let service: ToastOkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastOkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
