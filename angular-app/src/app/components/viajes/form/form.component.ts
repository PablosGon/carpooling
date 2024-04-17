import { Component } from '@angular/core';
import { Viaje } from '../../../entity/viaje';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Universidad } from '../../../entity/universidad';
import { Centro } from '../../../entity/centro';
import { Municipio } from '../../../entity/municipio';
import { Nucleo } from '../../../entity/nucleo';
import { UniversidadService } from '../../../services/universidad.service';
import { CentroService } from '../../../services/centro.service';
import { MunicipioService } from '../../../services/municipio.service';
import { NucleoService } from '../../../services/nucleo.service';
import { ViajeService } from '../../../services/viaje.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {

  universidades: Universidad[] = []
  centros: Centro[] = []
  municipios: Municipio[] = []
  nucleos: Nucleo[] = []

  universidadId = ""
  municipioId = ""

  viaje:Viaje = {
    id: '',
    conductorId: '',
    hora: new Date(),
    maxPlazas: 0,
    isvuelta: false,
    comentarios: '',
    descripcionCoche: '',
    solicitudes: [],
    plazas: [],
    nucleo: '',
    centro: '',
    precio: 0
  }
  
  submitted = false;

  constructor(
    private viajeService:ViajeService,
    private universidadService:UniversidadService,
    private centroService:CentroService,
    private municipioSerivice:MunicipioService,
    private nucleoService:NucleoService) {}

  ngOnInit(){
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data);
    this.centroService.getCentros().subscribe(data => this.centros = data)
    this.municipioSerivice.getMunicipios().subscribe(data => this.municipios = data)
    this.nucleoService.getNucleos().subscribe(data => this.nucleos = data)
  }

  getCentrosByUniversidadId(id:string){
    return this.centros.filter(centro => centro.universidadId == id)
  }

  getNucleosByMunicipioId(id:string){
    return this.nucleos.filter(nucleo => nucleo.municipioId == id)
  }

  consolelog(item:any){
    console.log(item)
  }

  newViaje(){
    console.log("Creando viaje...")
    this.viajeService.postViaje(this.viaje)
    console.log("Viaje creado!")
  }

}
