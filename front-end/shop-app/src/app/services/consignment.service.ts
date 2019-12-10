import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Consignment } from '../models/Consignment.model';

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

}
