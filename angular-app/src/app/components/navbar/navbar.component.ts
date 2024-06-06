import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../entity/usuario';

import { NgbNav, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbNav, NgbNavItem, NgbNavLink, NgbNavOutlet],
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

  usuarioId = sessionStorage.getItem('usuarioId')

  constructor(private usuarioService : UsuarioService){}

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
