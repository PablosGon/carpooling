import { Component } from '@angular/core';
import { Usuario } from '../../../entity/usuario';
import { FormsModule } from '@angular/forms';
import { Universidad } from '../../../entity/universidad';
import { Municipio } from '../../../entity/municipio';
import { UsuarioService } from '../../../services/usuario.service';
import { UniversidadService } from '../../../services/universidad.service';
import { MunicipioService } from '../../../services/municipio.service';

@Component({
  selector: 'app-adminusuarios',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adminusuarios.component.html',
  styleUrl: './adminusuarios.component.css'
})
export class AdminusuariosComponent {

  usuarios:Usuario[] = []
  universidades:Universidad[] = []
  municipios:Municipio[] = []

  usuarioId = sessionStorage.getItem('usuarioId')

  constructor(private usuarioService:UsuarioService, private universidadService:UniversidadService, private municipioService:MunicipioService){}

  ngOnInit(){
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data
      this.usuarios.forEach(usuario => {
        if(!usuario.universidad){
          usuario.universidad = {
            id:0,
            nombre:'',
            imagen:''
          }
        }
        if(!usuario.municipio){
          usuario.municipio = {
            id:0,
            nombre:'',
            imagen:''
          }
        }
      });
    })
    this.municipioService.getMunicipios().subscribe(data => {
      this.municipios = data
    })
    this.universidadService.getUniversidades().subscribe(data => {
      this.universidades = data
    })
  }

  updateUsuario(id:number, usuario:Usuario){
    this.usuarioService.updateUsuario(id, usuario).subscribe(data => window.location.reload())
  }

  deleteUsuario(id:number){
    this.usuarioService.deleteUsuario(id).subscribe(data => window.location.reload())
  }

  isAdmin(){
    return this.usuarioId ? this.usuarios.find(x => x.id == parseInt(this.usuarioId!))?.isAdmin : false
  }


}
