import { Component } from '@angular/core';
import { Viaje } from '../../../entity/viaje';
import { ViajeService } from '../../../services/viaje.service';
import { FormsModule } from '@angular/forms';
import { UniversidadService } from '../../../services/universidad.service';
import { NucleoService } from '../../../services/nucleo.service';
import { CentroService } from '../../../services/centro.service';
import { MunicipioService } from '../../../services/municipio.service';
import { Universidad } from '../../../entity/universidad';
import { Centro } from '../../../entity/centro';
import { Municipio } from '../../../entity/municipio';
import { Nucleo } from '../../../entity/nucleo';

@Component({
  selector: 'app-adminviajes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adminviajes.component.html',
  styleUrl: './adminviajes.component.css'
})
export class AdminviajesComponent {

  viajes:Viaje[] = []

  universidades:Universidad[] = []
  centros:Centro[] = []
  municipios:Municipio[] = []
  nucleos:Nucleo[] = []
  
  constructor(private viajeService:ViajeService,
    private universidadService:UniversidadService,
    private centroService:CentroService,
    private municipioService:MunicipioService,
    private nucleoService:NucleoService
  ){}

  ngOnInit(){
    this.viajeService.getViajes().subscribe(data => this.viajes = data)
    this.universidadService.getUniversidades().subscribe(data =>{
      this.universidades = data
    });
    this.municipioService.getMunicipios().subscribe(data => this.municipios = data)
  }

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

  getSalida(id:number){
    let viaje:Viaje = this.viajes.find(x => x.id == id)!;
    return viaje.isVuelta ? viaje.centro.nombre : viaje.nucleo.nombre
  }

  getDestino(id:number){
    let viaje:Viaje = this.viajes.find(x => x.id == id)!;
    return !viaje.isVuelta ? viaje.centro.nombre : viaje.nucleo.nombre
  }

  deleteViaje(id:number){
    this.viajeService.deleteViaje(id).subscribe();
    window.location.reload();
  }

  updateViaje(id:number, viaje:Viaje){
    this.viajeService.updateViaje(id, viaje).subscribe();
    window.location.reload();
  }

}
