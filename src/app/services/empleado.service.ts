import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  constructor(private http: HttpClient) {}

  crearEmpleado(formData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };

    return this.http.post<any>(
      '/cars-management/api/v1/employees/save',
      formData,
      requestOptions
    );
  }

  obtenerEmpleados() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.get<any>(
      '/cars-management/api/v1/employees/all',
      requestOptions
    );
  }

  eliminarEmployee(empleadoId: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    const requestOptions = { headers: headers };
    return this.http.delete<any>(
      `/cars-management/api/v1/employees/delete/${empleadoId}`,
      requestOptions
    );
  }
}
