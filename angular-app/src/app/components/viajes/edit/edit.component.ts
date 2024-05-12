import { Component, inject } from '@angular/core';
import { ViajeService } from '../../../services/viaje.service';
import { CentroService } from '../../../services/centro.service';
import { MunicipioService } from '../../../services/municipio.service';
import { NucleoService } from '../../../services/nucleo.service';
import { UniversidadService } from '../../../services/universidad.service';
import { Viaje } from '../../../entity/viaje';
import { Municipio } from '../../../entity/municipio';
import { Centro } from '../../../entity/centro';
import { Universidad } from '../../../entity/universidad';
import { Nucleo } from '../../../entity/nucleo';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  universidades: Universidad[] = []
  centros: Centro[] = []
  municipios: Municipio[] = []
  nucleos: Nucleo[] = []

  universidadId = 0
  municipioId = 0

  private route = inject(ActivatedRoute);
  id = parseInt(this.route.snapshot.paramMap.get('id')!);

  usuarioId = sessionStorage.getItem('usuarioId')

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
        nombre: ''
      },
      municipio: {
        id: 0,
        nombre: ''
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
        nombre: ''
      },
      imagen: ''
    },
    centro: {
      id: 0,
      nombre: '',
      universidad: {
        id: 0,
        nombre: ''
      },
      imagen: ''
    },
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
    this.viajeService.getViaje(this.id).subscribe(data => {
      this.viaje = data;
      this.getCentrosByUniversidadId(data.centro.universidad.id);
      this.getNucleosByMunicipioId(data.nucleo.municipio.id)
    })
    this.universidadService.getUniversidades().subscribe(data => this.universidades = data);
    this.municipioSerivice.getMunicipios().subscribe(data => this.municipios = data)
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

  consolelog(item:any){
    console.log(item)
  }

  updateViaje(){
    this.viaje.conductor.id = parseInt(this.usuarioId!)
    console.log(this.viaje)
    this.viajeService.updateViaje(this.id, this.viaje).subscribe(data => {
      window.location.href='/viaje/' + this.id
    })

  }
}
