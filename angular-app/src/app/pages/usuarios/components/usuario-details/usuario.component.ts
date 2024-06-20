import { Component, inject, numberAttribute } from '@angular/core';
import { Usuario } from '../../../../entity/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ViajeService } from '../../../../services/viaje.service';
import { Viaje } from '../../../../entity/viaje';
import { FormsModule } from '@angular/forms';
import { ValoracionService } from '../../../../services/valoracion.service';
import { Valoracion } from '../../../../entity/valoracion';
import { ViajeListComponent } from '../../../viajes/components/viaje-list/viaje-list.component';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { ImagesDefault } from '../../../../shared/constants/images-default.constant';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ViajeListComponent, NgbRating],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  readonly imagesDefault = ImagesDefault

  private route = inject(ActivatedRoute);

  constructor(private usuarioService:UsuarioService, private viajeService:ViajeService, private valoracionService:ValoracionService){}

  id = parseInt(this.route.snapshot.paramMap.get('id')!);
  userId = sessionStorage.getItem('usuarioId')

  valoracionError : boolean = false

  usuario?:Usuario

  viajes:Viaje[] = [];

  plazas:Viaje[] = []

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
    this.viajeService.getViajes({}, true, this.id).subscribe(data => {
      data.forEach((viaje) => {
        this.viajes.push(viaje)
      })
    })
    this.viajeService.getViajes({}, true, undefined, this.id).subscribe(data => {
      data.forEach((viaje) => {
        this.plazas.push(viaje)
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
      return parseInt(this.userId) == this.usuario!.id
    } else {
      return false
    }
  }

  updateValoracion(){
    if(this.valoracion.estrellas < 0 || this.valoracion.estrellas > 5){
      this.valoracionError = true
    } else {
      this.valoracionService.updateValoracion(this.valoracion.id, this.valoracion).subscribe(data => window.location.reload());
    }
  }

  createValoracion(){
    if(this.valoracion.estrellas < 0 || this.valoracion.estrellas > 5){
      this.valoracionError = true
    } else {
      this.valoracion.conductorId = this.id
      this.valoracion.pasajeroId = parseInt(this.userId!)
      this.valoracionService.postValoracion(this.valoracion).subscribe(data => window.location.reload());
    }
  }

  deleteValoracion(){
    this.valoracionService.deleteValoracion(this.valoracion.id).subscribe(data => window.location.reload())
  }

  usuarioImg(){

    let url = environment.BASE_CLOUDINARY_IMAGE_URL;

    if(this.usuario?.imagen) url += this.usuario.imagen
    else url += this.imagesDefault.usuarioDefault

    url += '.jpg'

    return url
  }

}
