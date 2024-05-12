import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

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
