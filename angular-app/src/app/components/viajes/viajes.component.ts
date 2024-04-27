import { Component } from '@angular/core';
import { ViajeService } from '../../services/viaje.service';
import { Viaje } from '../../entity/viaje';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CentroService } from '../../services/centro.service';
import { NucleoService } from '../../services/nucleo.service';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})

export class ViajesComponent {

  constructor(private viajeService: ViajeService, private centroService:CentroService, private nucleoService:NucleoService){ }

  viajes: Viaje[] = [];

  ngOnInit():void{
    this.viajeService.getViajes().subscribe(data => {this.viajes = data})
  }

}
