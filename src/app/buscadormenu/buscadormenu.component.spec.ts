import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscadormenuComponent } from './buscadormenu.component';

describe('BuscadormenuComponent', () => {
  let component: BuscadormenuComponent;
  let fixture: ComponentFixture<BuscadormenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BuscadormenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadormenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
