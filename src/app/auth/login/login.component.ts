import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from 'src/app/services/usuario.service';

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
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);

    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }
}
