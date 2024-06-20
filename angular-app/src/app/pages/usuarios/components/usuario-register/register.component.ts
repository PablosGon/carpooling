import { Component } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario.service';
import { Usuario } from '../../../../entity/usuario';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [UsuarioFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private usuarioService:UsuarioService){}

  error = ''

  async createUsuario(usuario:Usuario){

    this.usuarioService.createUsuario(usuario).subscribe(data => {
      sessionStorage.setItem("usuarioId", data.id.toString())
      window.location.href="/"
    }, error => {
      this.error = error.error
    });
    
  }



}
