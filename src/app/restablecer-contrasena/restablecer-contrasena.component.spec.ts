import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RestablecerContrasenaComponent } from './restablecer-contrasena.component';

describe('RestablecerContrasenaComponent', () => {
  let component: RestablecerContrasenaComponent;
  let fixture: ComponentFixture<RestablecerContrasenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestablecerContrasenaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RestablecerContrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
