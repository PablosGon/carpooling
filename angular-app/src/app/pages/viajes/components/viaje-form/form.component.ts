import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Viaje } from '../../../../entity/viaje';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Universidad } from '../../../../entity/universidad';
import { Centro } from '../../../../entity/centro';
import { Municipio } from '../../../../entity/municipio';
import { Nucleo } from '../../../../entity/nucleo';
import { UniversidadService } from '../../../../services/universidad.service';
import { CentroService } from '../../../../services/centro.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { NucleoService } from '../../../../services/nucleo.service';
import { ViajeService } from '../../../../services/viaje.service';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {

  @Output() onSubmit = new EventEmitter<Viaje>()
  @Input() idViaje? : number
  @Input() submitButtonText? : string

  universidades: Universidad[] = []
  centros: Centro[] = []
  municipios: Municipio[] = []
  nucleos: Nucleo[] = []

  universidadId = 0
  municipioId = 0

  usuarioId = sessionStorage.getItem('usuarioId')
  isVuelta = "false";

  error: boolean = false

  viaje:Viaje = {
    id: 0,
    fechaYHora: new Date(),
    maxPlazas: 0,
    comentarios: '',
    descripcionCoche: '',
    isVuelta: false,
    precio: 0,
    centro: {
      id: 0,
      nombre: '',
      universidad: {
        id: 0,
        nombre: '',
        imagen: ''
      },
      imagen: ''
    },
    nucleo: {
      id: 0,
      nombre: '',
      municipio: {
        id: 0,
        nombre: '',
        imagen: ''
      },
      imagen: ''
    },
    conductorId: 0
  } 
  
  constructor(
    private viajeService:ViajeService,
    private universidadService:UniversidadService,
    private centroService:CentroService,
    private municipioService:MunicipioService,
    private nucleoService:NucleoService) {}

  ngOnInit(){
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data);
    this.municipioService.getMunicipios().subscribe(data => this.municipios = data)
    if(this.idViaje){
      this.viajeService.getViaje(this.idViaje).subscribe(data => {
        this.universidadId = data.centro.universidad.id
        this.getCentrosByUniversidadId(this.universidadId)
        this.municipioId = data.nucleo.municipio.id
        this.getNucleosByMunicipioId(this.municipioId)
        this.viaje = data
        console.log()
      })
    }
  }

  getCentrosByUniversidadId(id:number){
    console.log(id)
    return this.centroService.getCentros(id).subscribe(data => {
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

  submit(){
    this.viaje!.conductorId = parseInt(this.usuarioId!)

    if(
      !this.viaje!.centro
      || !this.viaje!.nucleo
      || !this.viaje!.fechaYHora
      || this.viaje!.maxPlazas <= 0
      || this.viaje!.precio < 0
    ){
      this.error = true
    } else {
      this.onSubmit.emit(this.viaje)
    }

  }

}
