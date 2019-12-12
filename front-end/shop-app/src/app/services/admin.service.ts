import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  serverAPI_URL = `http://localhost:8085`;

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  addUser(user: any): Observable<User> {
    const url = `${this.serverAPI_URL}/admin/add`;
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.post<User>(url, user, httpOptions);
  }
}
