import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AdminviajesComponent } from './viajes/adminviajes.component';
import { AdminuniversidadesComponent } from './universidades/adminuniversidades.component';
import { AdminusuariosComponent } from './usuarios/adminusuarios.component';
import { AdminmunicipiosComponent } from './municipios/adminmunicipios.component';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../../../entity/usuario';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminviajesComponent, AdminuniversidadesComponent, AdminusuariosComponent, AdminmunicipiosComponent, NgbNav],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  private route = inject(ActivatedRoute);
  menu = parseInt(this.route.snapshot.paramMap.get('menu')!);

  usuarioId = sessionStorage.getItem('usuarioId')
  
  admin = false

  constructor(private usuarioService:UsuarioService){}

  ngOnInit(){

    if(!this.usuarioId){
      window.location.href="/admin/login"
    } else {
      this.usuarioService.getUsuario(parseInt(this.usuarioId)).subscribe(data => {
        if(!data.isAdmin){
          sessionStorage.removeItem('usuarioId')
          window.location.href="/admin/login"
        } else {
          this.admin = data.isAdmin
        }
      })
    }
  }

  isAdmin(){
    return this.usuarioId ? this.admin : false
  }

}
