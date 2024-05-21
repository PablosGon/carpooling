import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entity/usuario';
import { UniversidadService } from '../../../services/universidad.service';
import { MunicipioService } from '../../../services/municipio.service';
import { FormsModule } from '@angular/forms';
import { Universidad } from '../../../entity/universidad';
import { Municipio } from '../../../entity/municipio';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private usuarioService:UsuarioService, private universidadService:UniversidadService, private municipioService:MunicipioService){}

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
    pass: '',
    isAdmin: false
  }

  universidades:Universidad[] = []
  municipios:Municipio[] = []

  ngOnInit(){
    // const cld = new Cloudinary({cloud: {cloudName: 'dilfzvvw4'}});
    this.municipioService.getMunicipios().subscribe(data => {
      data.forEach(m => this.municipios.push(m))
    })
    this.universidadService.getUniversidades().subscribe(data => {
      data.forEach(u => this.universidades.push(u))
    })
  }

  submitUsuario(){
    console.log(this.usuario)
    this.usuarioService.createUsuario(this.usuario).subscribe();
    window.location.href="/viajes"
  }

}
