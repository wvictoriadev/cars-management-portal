import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      // password2: ['', Validators.required],
      // terminos: [false, Validators.required],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        console.log('Usuario Creado...');
        if (
          resp.username == null &&
          resp.username == null &&
          resp.valid == false
        ) {
          Swal.fire('Error', 'El usuario ya existe', 'error');
        }else{
          Swal.fire('Correctamente', 'Usuario Creado', 'success');
          this.router.navigateByUrl('/login');
        }
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }

  camposNoValidos(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsNoValidos(): boolean {
    const password1 = this.registerForm.get('password')?.value;
    const password2 = this.registerForm.get('password2')?.value;

    if (password1 !== password2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }
}
