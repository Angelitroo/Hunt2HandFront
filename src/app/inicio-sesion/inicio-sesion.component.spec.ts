import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InicioSesionComponent } from './inicio-sesion.component';

describe('IniciosesionComponent', () => {
  let component: InicioSesionComponent;
  let fixture: ComponentFixture<InicioSesionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [InicioSesionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InicioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
