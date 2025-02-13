import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReportarPopoverComponent } from './reportar-popover.component';

describe('ReportarPopoverComponent', () => {
  let component: ReportarPopoverComponent;
  let fixture: ComponentFixture<ReportarPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReportarPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportarPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
