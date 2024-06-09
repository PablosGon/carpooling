import { Component } from '@angular/core';
import { ViajeService } from '../../../services/viaje.service';
import { Viaje } from '../../../entity/viaje';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CentroService } from '../../../services/centro.service';
import { NucleoService } from '../../../services/nucleo.service';
import { FormsModule } from '@angular/forms';
import { Nucleo } from '../../../entity/nucleo';
import { Centro } from '../../../entity/centro';
import { Universidad } from '../../../entity/universidad';
import { Municipio } from '../../../entity/municipio';
import { UniversidadService } from '../../../services/universidad.service';
import { MunicipioService } from '../../../services/municipio.service';
import { ViajeListComponent } from './viaje-list/viaje-list.component';
import { ViajeFilterComponent } from './viaje-filter/viaje-filter.component';
import { ViajeFilter } from '../interfaces/viaje-filter';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ViajeListComponent, ViajeFilterComponent],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})

export class ViajesComponent {

  constructor(
    private viajeService:ViajeService,
    private universidadService:UniversidadService,
    private centroService:CentroService,
    private municipioSerivice:MunicipioService,
    private nucleoService:NucleoService) {}

  nucleos:Nucleo[] = []
  centros:Centro[] = []
  universidades:Universidad[] = []
  municipios:Municipio[] = []

  getCentrosByUniversidadId(id:number){
    console.log(id)
    return this.centroService.getCentrosByUniversidadID(id).subscribe(data => {
      this.centros = [];
      data.forEach(centro => this.centros.push(centro))
    })
  }

  getNucleosByMunicipioId(id:number){
    return this.nucleoService.getNucleosByMunicipioId(id).subscribe(data => {
      this.nucleos = [];
      data.forEach(nucleo => this.nucleos.push(nucleo))
    })
  }

  filtrar(filter:ViajeFilter){
    this.viajeService.getViajes(filter).subscribe(data => {this.viajes = data})
  }

  viajes: Viaje[] = [];

  ngOnInit():void{
    this.viajeService.getViajes({}).subscribe(data => {this.viajes = data})
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data);
    this.municipioSerivice.getMunicipios().subscribe(data => this.municipios = data)
  }

}
