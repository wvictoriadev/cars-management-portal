import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  crearUsuario(formData: RegisterForm) {
    return this.http.post(
      'http://localhost:8090/cars-management/api/v1/auth/register',
      formData
    );
  }

  login(formData: LoginForm) {
    return this.http.post(
      'http://localhost:8090/cars-management/api/v1/auth/login',
      formData
    );
  }
}
