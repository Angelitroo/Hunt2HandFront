import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PanelAdminComponent } from './panel-admin.component';

describe('PaneladminComponent', () => {
  let component: PanelAdminComponent;
  let fixture: ComponentFixture<PanelAdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PanelAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
