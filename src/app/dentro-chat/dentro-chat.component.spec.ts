import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DentroChatComponent } from './dentro-chat.component';

describe('DentroChatComponent', () => {
  let component: DentroChatComponent;
  let fixture: ComponentFixture<DentroChatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DentroChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DentroChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
