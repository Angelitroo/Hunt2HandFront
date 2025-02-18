import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AjustesPopoverComponent } from './ajustes-popover.component';

describe('AjustesPopoverComponent', () => {
  let component: AjustesPopoverComponent;
  let fixture: ComponentFixture<AjustesPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AjustesPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AjustesPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
