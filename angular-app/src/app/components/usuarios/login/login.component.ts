import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../entity/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private usuarioService:UsuarioService){}

  usuarioId = 0;

  login(){
    sessionStorage.setItem('usuarioId', this.usuarioId.toString())
    window.location.href="/viajes"
  }

}
