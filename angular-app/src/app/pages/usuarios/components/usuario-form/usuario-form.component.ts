import { Component, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../entity/usuario';
import { UniversidadService } from '../../../../services/universidad.service';
import { MunicipioService } from '../../../../services/municipio.service';
import { FormsModule } from '@angular/forms';
import { Universidad } from '../../../../entity/universidad';
import { Municipio } from '../../../../entity/municipio';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {

  @Output() onSubmit = new EventEmitter<Usuario>()

  usuarioId = sessionStorage.getItem('usuarioId')
  
  file : File | null = null

  allowedFileTypes = ["image/png", "image/jpeg"];

  universidades:Universidad[] = []
  municipios:Municipio[] = []

  error = ''

  usuario:Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    pass: '',
    telefono: '',
    grado: '',
    imagen: '',
    isAdmin: false,
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
    notificacionesNoLeidas: 0
  }

  constructor(private usuarioService:UsuarioService, private universidadService:UniversidadService, private municipioService:MunicipioService){}

  ngOnInit(){
    this.municipioService.getMunicipios().subscribe(data => {
      data.forEach(m => this.municipios.push(m))
    })

    this.universidadService.getUniversidades().subscribe(data => {
      data.forEach(u => this.universidades.push(u))
    })

    if(this.usuarioId){
      this.usuarioService.getUsuario(parseInt(this.usuarioId)).subscribe(data => {
        this.usuario = data
      })
    }
  }

  async submitUsuario(){
    if(this.usuario.correo && this.usuario.pass && this.usuario.telefono && this.usuario.nombre){
      if(this.file){
        var f = await this.getBase64(this.file)
        this.usuario.imagen = f
      }
      this.onSubmit.emit(this.usuario)
    } else {
      this.error = "Faltan campos obligatorios"
    }
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
    this.usuarioService.deleteProfilePicture(parseInt(this.usuarioId!)).subscribe(data => window.location.reload())
  }

}
