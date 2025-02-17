import { Component, OnDestroy } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from "./services/auth.service";
import { Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true
})
export class AppComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.authState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isAuthenticated => {
        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          takeUntil(this.destroy$)
        ).subscribe(() => {
          const currentUrl = this.router.url;

          if (!isAuthenticated && !this.isAllowedRoute(currentUrl)) {
            this.router.navigate(['/inicio-sesion']);
          }
        });
      });
  }

  private isAllowedRoute(url: string): boolean {
    return (
      url.startsWith('/activar-cuenta') ||
      url.startsWith('/recuperar-contrasena') ||
      url.startsWith('/restablecer-contrasena')
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
