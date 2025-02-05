import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModificarPerfilComponent } from './modificar-perfil.component';

describe('ModificarPerfilComponent', () => {
  let component: ModificarPerfilComponent;
  let fixture: ComponentFixture<ModificarPerfilComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModificarPerfilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
