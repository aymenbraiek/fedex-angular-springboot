import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  serverAPI_URL = `http://localhost:8085`;

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  getAllProducts(): Observable<Product[]> {
    const url = `${this.serverAPI_URL}/products/all`;
    const httpOptions = this.httpService.getHttpHeader();
    return this.http.get<Product[]>(url, httpOptions);
  }
}
