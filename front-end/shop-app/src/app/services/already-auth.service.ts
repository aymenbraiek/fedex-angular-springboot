import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/users']);
      return (false);
    } else {
      return (true);
    }
  }
}
