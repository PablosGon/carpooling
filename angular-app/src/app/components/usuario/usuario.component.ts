import { Component, inject } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ViajeService } from '../../services/viaje.service';
import { Viaje } from '../../entity/viaje';
import { FormsModule } from '@angular/forms';
import { ValoracionService } from '../../services/valoracion.service';
import { Valoracion } from '../../entity/valoracion';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  private route = inject(ActivatedRoute);

  constructor(private usuarioService:UsuarioService, private viajeService:ViajeService, private valoracionService:ValoracionService){}

  id = parseInt(this.route.snapshot.paramMap.get('id')!);
  userId = sessionStorage.getItem('usuarioId')

  usuario:Usuario = {
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
    pass: ''
  }

  viajes:Viaje[] = [];
  valoracion: Valoracion = {
    id: 0,
    estrellas: 0,
    pasajeroId: 0,
    conductorId: 0
  };
  prevRated: boolean = false;

  ngOnInit():void{
    this.initializeData()
  }

  initializeData(){
    this.usuarioService.getUsuario(this.id!).subscribe(data => {
      this.usuario = data
    });
    this.viajeService.getViajes().subscribe(data => {
      data.forEach((viaje) => {
        if(viaje.conductor.id == this.id){
          this.viajes.push(viaje);
        }
      })
    })
    if(this.userId){
      this.valoracionService.getValoraciones(this.id, parseInt(this.userId)).subscribe(data => {
        if(data.length > 0){
          this.valoracion = data[0];
          this.prevRated = true
        } else {
          this.prevRated = false
        }
      })
    }
  }

  isMyself(){
    if(this.userId){
      return parseInt(this.userId) == this.usuario.id
    } else {
      return false
    }
  }

  updateValoracion(){
    this.valoracionService.updateValoracion(this.id, this.valoracion).subscribe(data => window.location.reload());
  }

  createValoracion(){
    this.valoracion.conductorId = this.id
    this.valoracion.pasajeroId = parseInt(this.userId!)
    console.log(this.valoracion)
    this.valoracionService.postValoracion(this.valoracion).subscribe(data => window.location.reload());
  }

  deleteValoracion(){
    this.valoracionService.deleteValoracion(this.id).subscribe(data => window.location.reload())
  }

}
