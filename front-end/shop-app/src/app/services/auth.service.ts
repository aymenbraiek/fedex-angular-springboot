import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated = (): Boolean => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken === null || typeof jwtToken === 'undefined') {
      return false;
    }
    // return true;
    const isTokenExpired: boolean = jwtHelper.isTokenExpired(jwtToken);
    if (isTokenExpired) {
      localStorage.removeItem('jwtToken');
    }
    return !isTokenExpired;
  }
}
