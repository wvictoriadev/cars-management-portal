import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  public empleados: any[] = [];
  public formSubmitted = false;

  public empleadoForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    registration: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe((resp) => {
      this.empleados = resp;
    });
  }

  crearEmpleado() {
    this.formSubmitted = true;
    if (this.empleadoForm.invalid) {
      return;
    }

    this.empleadoService
      .crearEmpleado(this.empleadoForm.value)
      .subscribe((resp) => {
        this.cargarEmpleados();
        Swal.fire('Creado', 'Empleado Creado Correctamente', 'success');
      });
  }

  eliminarEmpleado(empleado: any) {
    this.empleadoService
      .eliminarEmployee(empleado.employeeId)
      .subscribe((resp) => {
        this.cargarEmpleados();
        Swal.fire('Eliminado', 'Empleado Eliminado Correctamente', 'success');
      });
  }

  camposNoValidos(campo: string): boolean {
    if (this.empleadoForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
