import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  public carros: any[] = [];
  public formSubmitted = false;

  public carroForm = this.formBuilder.group({
    reference: ['', [Validators.required]],
    brand: ['', Validators.required],
    fabricationDate: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private carroService: CarroService
  ) {}

  ngOnInit(): void {
    this.cargarCarros();
  }

  cargarCarros() {
    this.carroService.obtenerCarros().subscribe((resp) => {
      this.carros = resp;
    });
  }

  crearCarro() {
    this.formSubmitted = true;
    if (this.carroForm.invalid) {
      return;
    }

    this.carroService.crearCarro(this.carroForm.value).subscribe((resp) => {
      this.cargarCarros();
      Swal.fire('Creado', 'Carro Creado Correctamente', 'success');
    });
  }

  eliminarCarro(carro: any) {
    this.carroService.eliminarCarro(carro.carId).subscribe((resp) => {
      this.cargarCarros();
      Swal.fire('Eliminado', 'Carro Eliminado Correctamente', 'success');
    });
  }

  camposNoValidos(campo: string): boolean {
    if (this.carroForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
