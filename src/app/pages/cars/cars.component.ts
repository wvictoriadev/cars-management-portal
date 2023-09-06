import { Component, OnInit } from '@angular/core';
import { CarroService } from 'src/app/services/carro.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  public carros: any[] = [];
  constructor(private carroService: CarroService) {}

  ngOnInit(): void {
    this.cargarCarros();
  }

  cargarCarros() {
    this.carroService.obtenerCarros().subscribe((resp) => {
      this.carros = resp;
    });
  }
}
