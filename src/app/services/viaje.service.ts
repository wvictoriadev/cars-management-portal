import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  constructor(private http: HttpClient) {}

  crearViaje(formData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };

    return this.http.post<any>(
      '/cars-management/api/v1/trips/save',
      formData,
      requestOptions
    );
  }

  obtenerViajes() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<any>(
      '/cars-management/api/v1/trips/all',
      requestOptions
    );
  }

  eliminarViaje(viajeId: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.delete<any>(
      `/cars-management/api/v1/trips/delete/${viajeId}`,
      requestOptions
    );
  }
}
