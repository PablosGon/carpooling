import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entity/usuario';
import { UniversidadService } from '../../../services/universidad.service';
import { MunicipioService } from '../../../services/municipio.service';
import { FormsModule } from '@angular/forms';
import { Universidad } from '../../../entity/universidad';
import { Municipio } from '../../../entity/municipio';
import { Buffer } from 'buffer';

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
    pass: '',
    isAdmin: false
  }

  file : File | null = null

  universidades:Universidad[] = []
  municipios:Municipio[] = []

  error = ''

  ngOnInit(){
    this.municipioService.getMunicipios().subscribe(data => {
      data.forEach(m => this.municipios.push(m))
    })
    this.universidadService.getUniversidades().subscribe(data => {
      data.forEach(u => this.universidades.push(u))
    })
  }

  async submitUsuario(){
    if(this.usuario.correo && this.usuario.pass && this.usuario.telefono && this.usuario.nombre){
      this.createUsuario()
    } else {
      this.error = "Faltan campos obligatorios"
    }
  }

  async createUsuario(){

    if(this.file){
      var f = await this.getBase64(this.file)
      this.usuario.imagen = f
    }

    this.usuarioService.createUsuario(this.usuario).subscribe(data => {
      sessionStorage.setItem("usuarioId", data.id.toString())
      window.location.href="/viajes"
    }, error => {
      this.error = error.error
    });
    
  }

  async getBase64(file:File){
    const arrayBuffer = await file.arrayBuffer();
    const b = Buffer.from(arrayBuffer);
    return "data:image/jpeg;base64," + b.toString('base64')
  }

  readFile(){
    var inputFile = (<HTMLInputElement> document.getElementById("img")).files?.item(0)
    if(inputFile){
      this.file = inputFile
    }
  }

}
