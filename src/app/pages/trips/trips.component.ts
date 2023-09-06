import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ViajeService } from 'src/app/services/viaje.service';
import { CarroService } from 'src/app/services/carro.service';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  public viajes: any[] = [];
  public carros: any[] = [];
  public empleados: any[] = [];
  public formSubmitted = false;

  public viajeForm = this.formBuilder.group({
    employeeId: ['', [Validators.required]],
    carId: ['', Validators.required],
    endDate: ['', Validators.required],
    deliverDate: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private viajeService: ViajeService,
    private carroService: CarroService,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.cargarViajes();
    this.cargarCarros();
    this.cargarEmpleados();
  }

  cargarViajes() {
    this.viajeService.obtenerViajes().subscribe((resp) => {
      this.viajes = resp;
    });
  }

  cargarCarros() {
    this.carroService.obtenerCarros().subscribe((resp) => {
      this.carros = resp;
    });
  }

  cargarEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe((resp) => {
      this.empleados = resp;
    });
  }

  crearViaje() {
    this.formSubmitted = true;
    if (this.viajeForm.invalid) {
      return;
    }

    this.viajeService.crearViaje(this.viajeForm.value).subscribe((resp) => {
      this.cargarViajes();
      Swal.fire('Creado', 'Viaje Creado Correctamente', 'success');
    });
  }

  eliminarViaje(viaje: any) {
    this.viajeService.eliminarViaje(viaje.tripId).subscribe((resp) => {
      this.cargarViajes();
      Swal.fire('Eliminado', 'Viaje Eliminado Correctamente', 'success');
    });
  }

  camposNoValidos(campo: string): boolean {
    if (this.viajeForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
