import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Viaje } from '../../../../entity/viaje';
import { Universidad } from '../../../../entity/universidad';
import { Nucleo } from '../../../../entity/nucleo';
import { Centro } from '../../../../entity/centro';
import { Municipio } from '../../../../entity/municipio';
import { UniversidadService } from '../../../../services/universidad.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { CentroService } from '../../../../services/centro.service';
import { NucleoService } from '../../../../services/nucleo.service';
import { ViajeFilter } from '../../interfaces/viaje-filter';

@Component({
  selector: 'app-viaje-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './viaje-filter.component.html',
  styleUrl: './viaje-filter.component.css'
})
export class ViajeFilterComponent {

  @Output() filtrar = new EventEmitter<ViajeFilter>();

  viajeFilter:ViajeFilter = {}

  nucleos:Nucleo[] = []
  centros:Centro[] = []
  universidades:Universidad[] = []
  municipios:Municipio[] = []

  constructor(private universidadService:UniversidadService, 
    private municipioService:MunicipioService,
    private centroService:CentroService,
    private nucleoService:NucleoService
  ){}

  ngOnInit():void{
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data);
    this.municipioService.getMunicipios().subscribe(data => this.municipios = data)
  }

  submit(){
    this.filtrar.emit(this.viajeFilter)
  }

  getCentrosByUniversidadId(id?:number){
    
    this.centros = [];

    if(id){
      this.centroService.getCentrosByUniversidadID(id).subscribe(data => {
        data.forEach(centro => this.centros.push(centro))
      })
    }
  }

  getNucleosByMunicipioId(id?:number){

    this.nucleos = [];

    if(id){
      this.nucleoService.getNucleosByMunicipioId(id).subscribe(data => {
        data.forEach(nucleo => this.nucleos.push(nucleo))
      })
    }
  }

}
