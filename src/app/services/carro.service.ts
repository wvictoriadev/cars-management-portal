import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class CarroService {
  constructor(private http: HttpClient) {}

  crearCarro(formData: any) {
    const url = `${base_url}/cars/save`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };

    return this.http.post<any>(url, formData, requestOptions);
  }

  obtenerCarros() {
    const url = `${base_url}/cars/all`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<any>(url, requestOptions);
  }

  eliminarCarro(carroId: any) {
    const url = `${base_url}/cars/delete`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.delete<any>(`${url}/${carroId}`, requestOptions);
  }
}
