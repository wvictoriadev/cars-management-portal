import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  crearUsuario(formData: RegisterForm) {
    return this.http
      .post(
        'http://localhost:8090/cars-management/api/v1/auth/register',
        formData
      )
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formData: LoginForm) {
    return this.http
      .post('http://localhost:8090/cars-management/api/v1/auth/login', formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('username', resp.username);
          localStorage.setItem('valid', resp.valid);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
