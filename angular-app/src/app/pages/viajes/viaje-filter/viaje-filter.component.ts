import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from 'stream';
import { Viaje } from '../../../entity/viaje';
import { Universidad } from '../../../entity/universidad';
import { Nucleo } from '../../../entity/nucleo';
import { Centro } from '../../../entity/centro';
import { Municipio } from '../../../entity/municipio';
import { UniversidadService } from '../../../services/universidad.service';
import { MunicipioService } from '../../../services/municipio.service';
import { CentroService } from '../../../services/centro.service';
import { NucleoService } from '../../../services/nucleo.service';

@Component({
  selector: 'app-viaje-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './viaje-filter.component.html',
  styleUrl: './viaje-filter.component.css'
})
export class ViajeFilterComponent {

  @Output() public filtrar = new EventEmitter();

  universidadId?: number;
  centroId?: number;
  municipioId?: number;
  nucleoId?: number;
  isVuelta?: boolean;
  fechaYHora?: Date;

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
    this.filtrar.emit("")
  }

  getCentrosByUniversidadId(id?:number){
    
    return id ? this.centroService.getCentrosByUniversidadID(id).subscribe(data => {
      this.centros = [];
      data.forEach(centro => this.centros.push(centro))
    }) : []
  }

  getNucleosByMunicipioId(id?:number){
    return this.nucleoService.getNucleosByMunicipioId(id).subscribe(data => {
      this.nucleos = [];
      data.forEach(nucleo => this.nucleos.push(nucleo))
    })
  }

}
