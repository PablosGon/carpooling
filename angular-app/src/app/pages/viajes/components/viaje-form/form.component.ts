import { Component, EventEmitter, Output } from '@angular/core';
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

  universidades: Universidad[] = []
  centros: Centro[] = []
  municipios: Municipio[] = []
  nucleos: Nucleo[] = []

  universidadId = 0
  municipioId = 0

  usuarioId = sessionStorage.getItem('usuarioId')
  isVuelta = "false";

  viaje:Viaje = {
    id: 0,
    conductor: {
      id: 0,
      nombre: '',
      correo: '',
      telefono: '',
      grado: '',
      imagen: '',
      universidad: {
        id: 0,
        nombre: '',
        imagen: ''
      },
      municipio: {
        id: 0,
        nombre: '',
        imagen: ''
      },
      valoracionMedia: 0,
      numValoraciones: 0,
      notificacionesNoLeidas: 0,
      pass: '',
      isAdmin: false
    },
    fechaYHora: new Date(),
    maxPlazas: 0,
    isVuelta: false,
    comentarios: '',
    descripcionCoche: '',
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
    precio: 0
  }
  
  constructor(
    private universidadService:UniversidadService,
    private centroService:CentroService,
    private municipioService:MunicipioService,
    private nucleoService:NucleoService) {}

  ngOnInit(){
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data);
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

  submit(){
    this.viaje.conductor.id = parseInt(this.usuarioId!)
    this.onSubmit.emit(this.viaje)
  }

}
