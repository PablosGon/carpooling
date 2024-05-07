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

  correo:string = ''
  pass:string = ''
  notFound:boolean = false

  login(){
    this.usuarioService.getUsuarios(this.correo, this.pass).subscribe(data => {
      if(data.length > 0){
        sessionStorage.setItem('usuarioId', data[0].id.toString())
        window.location.href="/viajes"
      } else {
        this.notFound = true
      }
    })
  }

}
