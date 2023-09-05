import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm = this.fb.group({
    nombre: ['Juan Carlos', [Validators.required, Validators.minLength(3)]],
    email: ['juan.velez@gmail.com', [Validators.required]],
    password: ['12345678a', [Validators.required]],
    password2: ['12345678a', [Validators.required]],
    terminos: [false, [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  crearUsuario(){
    console.log(this.registerForm.value);
  }
}
