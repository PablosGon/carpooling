import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  usuarioId = sessionStorage.getItem('usuarioId')


  constructor(private usuarioService:UsuarioService){}

  ngOnInit(){

    if(!this.usuarioId){
      window.location.href="/admin/login"
    } else {
      this.usuarioService.getUsuario(parseInt(this.usuarioId)).subscribe(data => {
        if(!data.isAdmin){
          sessionStorage.removeItem('usuarioId')
          window.location.href="/admin/login"
        }
      })
    }
  }

}
