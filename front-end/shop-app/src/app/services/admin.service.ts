import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { User } from '../models/User.model';
import { Consignment } from '../models/Consignment.model';

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

  loadAllEmployees(): Observable<User[]> {
    const url = `${this.serverAPI_URL}/admin/employees/all`;
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.get<User[]>(url, httpOptions);
  }

  assignEmployee(email: string, assigned_consignment: Consignment): Observable<{
    user: User,
    consignment: Consignment
  }> {
    const url = `${this.serverAPI_URL}/admin/assign`;
    const httpOptions = this.httpService.getHttpHeader();
    const body = {
      userEmail: email,
      consignment: assigned_consignment
    }
    return this.http.post<{ user: User, consignment: Consignment }>(url, body, httpOptions);
  }

}
