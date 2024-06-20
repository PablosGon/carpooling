import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Viaje } from '../../../../entity/viaje';
import { ImagesDefault } from '../../../../shared/constants/images-default.constant';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-viaje-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './viaje-item.component.html',
  styleUrl: './viaje-item.component.css'
})
export class ViajeItemComponent {

  @Input() viaje?:Viaje

  readonly imagesDefault = ImagesDefault

  destino(){
    return this.viaje!.isVuelta ? this.viaje!.nucleo.nombre : this.viaje!.centro.nombre
  }

  salida(){
    return this.viaje!.isVuelta ? this.viaje!.centro.nombre : this.viaje!.nucleo.nombre
  }

  nucleoImg(){

    let url = environment.BASE_CLOUDINARY_IMAGE_URL;

    if(this.viaje?.nucleo.imagen) url += this.viaje.nucleo.imagen
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
