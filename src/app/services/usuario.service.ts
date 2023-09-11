import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  crearUsuario(formData: RegisterForm) {
    const url = `${base_url}/auth/register`;
    return this.http
      .post(
        url,
        formData
      )
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  login(formData: LoginForm) {
    const url = `${base_url}/auth/login`;
    return this.http
      .post(url, formData)
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
