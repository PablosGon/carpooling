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

  id = parseInt(this.route.snapshot.paramMap.get('id')!);

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
      },
      valoracionMedia: 0,
      numValoraciones: 0,
      notificacionesNoLeidas: 0,
      pass: '',
      isAdmin: false
    }
  };

  plazas:Plaza[] = []
  solicitudes:Plaza[] = []

  addComments:boolean = false

  ngOnInit(){
    this.initializeData();
  }

  async initializeData(){
    (await this.viajeService.getViaje(this.id!)).subscribe(data => {
      console.log(data)
      this.viaje = data
      this.viaje.fechaYHora = new Date()
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
      this.plazaService.acceptPlaza(id).subscribe()
    } else {
      this.plazaService.deletePlaza(id).subscribe()
    }

    window.location.reload()
  }

  deleteViaje(){
    this.viajeService.deleteViaje(this.viaje.id).subscribe()
    //window.location.href="/viajes"
  }
}
