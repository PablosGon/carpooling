import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entity/usuario';

import { NgbNav, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbNav, NgbNavItem, NgbNavLink, NgbNavOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  usuario? : Usuario
  usuarioId = sessionStorage.getItem('usuarioId')

  constructor(private usuarioService : UsuarioService){}

  ngOnInit(){
    if(this.usuarioId){
      this.usuarioService.getUsuario(parseInt(this.usuarioId)).subscribe(data => {
        this.usuario = data
      })
    }
  }

  login(){
    window.location.href="/login";
  }

  logout(){
    sessionStorage.removeItem('usuarioId')
    window.location.href="/"
  }

}
