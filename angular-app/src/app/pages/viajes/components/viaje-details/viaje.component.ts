import { Component, Input, inject } from '@angular/core';
import { ViajeService } from '../../../../services/viaje.service';
import { Viaje } from '../../../../entity/viaje';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Plaza } from '../../../../entity/plaza';
import { PlazaService } from '../../../../services/plaza.service';
import { ViajePlazaListComponent } from '../viaje-plaza-list/viaje-plaza-list.component';
import { ViajeConductorComponent } from '../viaje-conductor/viaje-conductor.component';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../entity/usuario';
import { environment } from '../../../../../environments/environment';
import { ImagesDefault } from '../../../../shared/constants/images-default.constant';

@Component({
  selector: 'app-viaje',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ViajePlazaListComponent, ViajeConductorComponent],
  templateUrl: './viaje.component.html',
  styleUrl: './viaje.component.css'
})
export class ViajeComponent {

  private readonly imagesDefault = ImagesDefault

  private route = inject(ActivatedRoute);
  id = parseInt(this.route.snapshot.paramMap.get('id')!);
  
  constructor(private viajeService: ViajeService, private plazaService: PlazaService, private usuarioService:UsuarioService){ }


  usuarioId = parseInt(sessionStorage.getItem('usuarioId')!)

  viaje?:Viaje

  plazas:Plaza[] = []
  solicitudes:Plaza[] = []

  addComments:boolean = false

  ngOnInit(){
    this.viajeService.getViaje(this.id!).subscribe(data => {
      this.viaje = data
      this.viaje.fechaYHora = new Date(data.fechaYHora)
      this.plazaService.getPlazasByViajeId(this.viaje.id).subscribe(data => {
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
      return this.usuarioId == this.viaje!.conductorId
    } else {
      return false
    }
  }

  plazaAvailable(){
    return this.plazas.length < this.viaje!.maxPlazas
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
    this.viajeService.deleteViaje(this.viaje!.id).subscribe()
    window.location.href="/"
  }

  getDestino(){
    return !this.viaje?.isVuelta ? this.viaje?.centro?.nombre : this.viaje?.nucleo?.nombre
  }

  getOrigen(){
    return this.viaje?.isVuelta ? this.viaje?.centro?.nombre : this.viaje?.nucleo?.nombre
  }

  nucleoImg(){

    let url = environment.BASE_CLOUDINARY_IMAGE_URL;

    if(this.viaje?.nucleo?.imagen) url += this.viaje?.nucleo?.imagen
    else url += this.imagesDefault.nucleoDefault

    url += '.jpg'

    return url
  }

  centroImg(){

    let url = environment.BASE_CLOUDINARY_IMAGE_URL;

    if(this.viaje?.centro.imagen) url += this.viaje.centro.imagen
    else url += this.imagesDefault.centroDefault

    url += '.jpg'

    return url
  }

  salidaImg(){
    return this.viaje?.isVuelta ? this.centroImg() : this.nucleoImg()
  }

  destinoImg(){
    return this.viaje?.isVuelta ? this.nucleoImg() : this.centroImg()
  }
}
