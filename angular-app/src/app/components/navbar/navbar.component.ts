import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../entity/usuario';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  usuario : Usuario = {
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

  usuarioId = sessionStorage.getItem('usuarioId')

  constructor(private router : Router, private usuarioService : UsuarioService){}

  ngOnInit(){
    console.log(this.usuarioId)
    if(this.usuarioId){
      this.usuarioService.getUsuario(parseInt(this.usuarioId)).subscribe(data => {
        this.usuario = data
        console.log(this.usuario)

      })
    }
  }

  login(){
    window.location.href="http://localhost:4200/login";
  }

  logout(){
    sessionStorage.removeItem('usuarioId')
    window.location.href="http://localhost:4200/viajes"
  }

}
