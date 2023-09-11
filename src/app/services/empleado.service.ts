import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  crearEmpleado(formData: any) {
    const url = `${base_url}/employees/save`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };

    return this.http.post<any>(url, formData, requestOptions);
  }

  obtenerEmpleados() {
    const url = `${base_url}/employees/all`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<any>(url, requestOptions);
  }

  eliminarEmployee(empleadoId: any) {
    const url = `${base_url}/employees/delete`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.delete<any>(`${url}/${empleadoId}`, requestOptions);
  }
}
