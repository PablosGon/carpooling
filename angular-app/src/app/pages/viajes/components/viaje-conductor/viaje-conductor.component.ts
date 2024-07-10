import { Component, Input } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../entity/usuario';
import { ImagesDefault } from '../../../../shared/constants/images-default.constant';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-viaje-conductor',
  standalone: true,
  imports: [],
  templateUrl: './viaje-conductor.component.html',
  styleUrl: './viaje-conductor.component.css'
})
export class ViajeConductorComponent {

  @Input() idUsuario? : number
  @Input() comentarios? : string

  readonly imagesDefault = ImagesDefault

  constructor(private usuarioService : UsuarioService){}

  usuario?:Usuario

  ngOnInit(){
    this.usuarioService.getUsuario(this.idUsuario!).subscribe(data => {
      this.usuario = data
    })
  }

  usuarioImg(){

    let url = environment.BASE_CLOUDINARY_IMAGE_URL;

    if(this.usuario?.imagen) url += this.usuario.imagen
    else url += this.imagesDefault.usuarioDefault

    url += '.jpg'

    return url
  }

}
