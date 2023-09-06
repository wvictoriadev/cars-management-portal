import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  constructor(private http: HttpClient) {}

  obtenerCarros() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<any>(
      '/cars-management/api/v1/cars/all',
      requestOptions
    );
  }
}
