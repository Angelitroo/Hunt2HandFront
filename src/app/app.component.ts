import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from "./services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true
})

export class AppComponent {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // if (this.authService.isAuth()) {
    //   this.router.navigate(['/inicio-sesion']);
    // }
  }
}
