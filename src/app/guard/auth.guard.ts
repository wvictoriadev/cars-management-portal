import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const tokenValido = Boolean(localStorage.getItem('valid'));
    console.log(tokenValido);
    if (!tokenValido) {
      this.router.navigateByUrl('/login');
    }

    return tokenValido;
  }
}
