import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscadorMenuComponent } from './buscador-menu.component';

describe('BuscadormenuComponent', () => {
  let component: BuscadorMenuComponent;
  let fixture: ComponentFixture<BuscadorMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BuscadorMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
