import { Component, Input, inject } from '@angular/core';
import { ViajeService } from '../../services/viaje.service';
import { Viaje } from '../../entity/viaje';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Plaza } from '../../entity/plaza';
import { PlazaService } from '../../services/plaza.service';

@Component({
  selector: 'app-viaje',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './viaje.component.html',
  styleUrl: './viaje.component.css'
})
export class ViajeComponent {

  private route = inject(ActivatedRoute);

  constructor(private viajeService: ViajeService, private plazaService: PlazaService){ }

  id = this.route.snapshot.paramMap.get('id');

  usuarioId = sessionStorage.getItem('usuarioId')

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
        nombre: ''
      },
      imagen: ''
    },
    nucleo: {
      id: 0,
      nombre: '',
      municipio: {
        id: 0,
        nombre: ''
      },
      imagen: ''
    },
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
      }
    }
  };
  plazas:Plaza[] = []
  solicitudes:Plaza[] = []

  ngOnInit(){
    this.initializeData();
  }

  async initializeData(){
    (await this.viajeService.getViaje(this.id!)).subscribe(data => {
      console.log(data)
      this.viaje.id = data.id;
      this.viaje.conductor.id = data.conductor.id;
      this.viaje.fechaYHora = new Date(data.fechaYHora);
      this.viaje.maxPlazas = data.maxPlazas;
      this.viaje.isVuelta = data.isVuelta;
      this.viaje.comentarios = data.comentarios;
      this.viaje.descripcionCoche = data.descripcionCoche;
      this.viaje.nucleo = data.nucleo;
      this.viaje.centro = data.centro;
      this.viaje.conductor.id = data.conductor.id;
      this.viaje.conductor.nombre = data.conductor.nombre;
      this.viaje.conductor.correo = data.conductor.correo;
      this.viaje.conductor.telefono = data.conductor.telefono;
      this.plazaService.getPlazasByViajeId(this.viaje.id).subscribe(data => {
        console.log(data)
        data.forEach(plaza => {
          if(plaza.aceptada){
            this.plazas.push(plaza)
          } else {
            this.solicitudes.push(plaza)
          }
        })
      })
    });    

  }

  isMyself(){
    if(this.usuarioId){
      return parseInt(this.usuarioId) == this.viaje.conductor.id
    } else {
      return false
    }
  }

  handlePlaza(aceptada:boolean, id:number, comentarios:string){
    if(aceptada){
      let plaza = this.solicitudes.find(x => x.id == id)
      plaza!.aceptada = true
      plaza!.comentariosConductor = comentarios
      this.plazaService.updatePlaza(id, plaza!).subscribe()
    } else {
      this.plazaService.deletePlaza(id).subscribe()
    }
  }

}
