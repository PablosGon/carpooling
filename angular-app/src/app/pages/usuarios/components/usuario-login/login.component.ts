import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';

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
      console.log(data)
      if(data.length == 1){
        sessionStorage.setItem('usuarioId', data[0].id.toString())
        window.location.href="/"
      } else {
        this.notFound = true
      }
    })
  }

}
