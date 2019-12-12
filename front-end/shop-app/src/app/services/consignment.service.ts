import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Consignment } from '../models/Consignment.model';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentService {
  serverAPI_URL = `http://localhost:8085`;

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  getAllConsignments(email: string): Observable<{ notReceived: Consignment[], received: Consignment[] }> {
    const url = `${this.serverAPI_URL}/consignments/all`;
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.post<{ notReceived: Consignment[], received: Consignment[] }>(url, email, httpOptions);
  }

  addConsignment(payload: {
    user: User,
    consignment: Consignment
  }): Observable<boolean> {
    const url = `${this.serverAPI_URL}/consignments/add`;
    const httpOptions = this.httpService.getHttpHeader();
    const user_roles = [];
    [...payload.user.roles].forEach(role => user_roles.push({ role: role }));
    const body = {
      ...payload,
      user: {
        ...payload.user,
        roles: user_roles,
        consignments: [...payload.user.consignments]
      }
    }
    // console.log(body);
    return this.http.post<boolean>(url, body, httpOptions);
  }

}
