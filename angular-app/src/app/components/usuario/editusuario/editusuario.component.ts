import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../entity/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { UniversidadService } from '../../../services/universidad.service';
import { MunicipioService } from '../../../services/municipio.service';
import { Universidad } from '../../../entity/universidad';
import { Municipio } from '../../../entity/municipio';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-editusuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editusuario.component.html',
  styleUrl: './editusuario.component.css'
})
export class EditusuarioComponent {

  private route = inject(ActivatedRoute);
  id = parseInt(this.route.snapshot.paramMap.get('id')!);

  constructor(private usuarioService:UsuarioService, private universidadService:UniversidadService, private municipioService:MunicipioService, private imageService:ImageService){}

  universidades:Universidad[] = []
  municipios:Municipio[] = []

  filename:File|null = null

  usuario:Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    pass: '',
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
    isAdmin: false
  }

  ngOnInit(){
    this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data
    })
    this.universidadService.getUniversidades().subscribe(data => {
      this.universidades = data
    })
    this.municipioService.getMunicipios().subscribe(data => {
      this.municipios = data
    })
  }

  updateUsuario(){
    console.log(this.filename)

    let fr = new FileReader()

    fr.readAsDataURL(this.filename!);

    this.imageService.uploadImage(fr.result!.toString()).subscribe(data => {

      console.log(data)
    });
    this.usuarioService.updateUsuario(this.id, this.usuario).subscribe()
    //window.location.href='usuario/' + this.id
  }

}
