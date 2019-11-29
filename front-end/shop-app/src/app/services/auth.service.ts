import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AuthService {

  constructor() { }

  isAuthenticated = (): Boolean => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken === null || typeof jwtToken === 'undefined') {
      return false;
    }
    // return true;
    return !jwtHelper.isTokenExpired(jwtToken);
  }
}
