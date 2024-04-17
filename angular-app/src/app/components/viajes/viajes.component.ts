import { Component } from '@angular/core';
import { ViajeService } from '../../services/viaje.service';
import { Viaje } from '../../entity/viaje';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CentroService } from '../../services/centro.service';
import { NucleoService } from '../../services/nucleo.service';
import { Nucleo } from '../../entity/nucleo';
import { Centro } from '../../entity/centro';

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
  nucleos: Nucleo[] = [];
  centros: Centro[] = [];

  ngOnInit():void{
    this.viajeService.getViajes().subscribe(data => {this.viajes = data})
    this.nucleoService.getNucleos().subscribe(data => {this.nucleos = data})
    this.centroService.getCentros().subscribe(data => {this.centros = data});
  }

  getCentro(id:string){
    return this.centros.find(c => c.id == id);
  }

  getNucleo(id:string){
    return this.nucleos.find(n => n.id == id);
  }

}
