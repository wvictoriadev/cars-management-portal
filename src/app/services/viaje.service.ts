import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ViajeService {
  constructor(private http: HttpClient) {}

  crearViaje(formData: any) {
    const url = `${base_url}/trips/save`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };

    return this.http.post<any>(url, formData, requestOptions);
  }

  obtenerViajes() {
    const url = `${base_url}/trips/all`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<any>(url, requestOptions);
  }

  eliminarViaje(viajeId: any) {
    const url = `${base_url}/trips/delete`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.delete<any>(`${url}/${viajeId}`, requestOptions);
  }
}
