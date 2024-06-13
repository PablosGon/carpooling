import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../../../entity/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../../../services/usuario.service';
import { UniversidadService } from '../../../../services/universidad.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { Universidad } from '../../../../entity/universidad';
import { Municipio } from '../../../../entity/municipio';
import { Buffer } from 'buffer';

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

  constructor(private usuarioService:UsuarioService, private universidadService:UniversidadService, private municipioService:MunicipioService){}

  universidades:Universidad[] = []
  municipios:Municipio[] = []

  file : File | null = null
  allowedFileTypes = ["image/png", "image/jpeg"];

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
      nombre: '',
      imagen: ''
    },
    municipio: {
      id: 0,
      nombre: '',
      imagen: ''
    },
    valoracionMedia: 0,
    numValoraciones: 0,
    notificacionesNoLeidas: 0,
    isAdmin: false
  }

  ngOnInit(){
    this.usuarioService.getUsuario(this.id).subscribe(data => {
      this.usuario = data
      if(!data.universidad){
        this.usuario.universidad = {
          id: 0,
          nombre: '',
          imagen: ''
        }
      }
      if(!data.municipio){
        this.usuario.municipio = {
          id: 0,
          nombre: '',
          imagen: ''
        }
      }
    })
    this.universidadService.getUniversidades().subscribe(data => {
      this.universidades = data
    })
    this.municipioService.getMunicipios().subscribe(data => {
      this.municipios = data
    })
  }

  async updateUsuario(){
    if(this.file){
      var f = await this.getBase64(this.file)
      this.usuario.imagen = f
    }
    this.usuarioService.updateUsuario(this.id, this.usuario).subscribe(data => window.location.href='usuario/' + this.id)
  }

  async getBase64(file:File){
    const arrayBuffer = await file.arrayBuffer();
    const b = Buffer.from(arrayBuffer);
    return "data:image/jpeg;base64," + b.toString('base64')
  }

  readFile(){
    var inputFile = (<HTMLInputElement> document.getElementById("img")).files?.item(0)
    if(inputFile){
      if(this.allowedFileTypes.includes(inputFile.type)){
        this.file = inputFile
        document.getElementById('fileWarning')!.innerText = "";
      } else {
        document.getElementById('fileWarning')!.innerText = "Tipo de archivo no permitido";
      }
    }
    console.log(this.file)
  }

  deleteProfilePicture(){
    this.usuarioService.deleteProfilePicture(this.usuario.id).subscribe(data => window.location.reload())
  }

}
