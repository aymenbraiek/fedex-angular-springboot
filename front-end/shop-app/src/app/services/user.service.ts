import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User.model';

const httpOptions = {
  headers: localStorage.getItem('jwtToken') !== null && typeof localStorage.getItem('jwtToken') !== 'undefined' ? new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('jwtToken')
  }) : new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  serverAPI_URL = `http://localhost:8085`;

  constructor(private http: HttpClient) { }

  getUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(`${this.serverAPI_URL}/users`, httpOptions);
  }

  logIn = (email: string, password: string): Observable<any> => {
    const url = `${this.serverAPI_URL}/login`;
    const body = {
      email: email,
      password: password
    };
    return this.http.post<any>(url, body, httpOptions);
  }

  register = (payload): Observable<any> => {
    const url = `${this.serverAPI_URL}/register`;
    return this.http.post<any>(url, payload, httpOptions);
  }

  getHello = (): Observable<any> => {
    const url = `${this.serverAPI_URL}/hello`;
    return this.http.get<String>(url, httpOptions);
  }
}
