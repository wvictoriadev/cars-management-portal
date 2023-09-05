import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    // remember: [false]
  });

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }
}
