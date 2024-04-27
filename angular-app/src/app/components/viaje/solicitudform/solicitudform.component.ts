import { Component, inject } from '@angular/core';
import { PlazaService } from '../../../services/plaza.service';
import { FormsModule } from '@angular/forms';
import { Plaza } from '../../../entity/plaza';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-solicitudform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './solicitudform.component.html',
  styleUrl: './solicitudform.component.css'
})
export class SolicitudformComponent {

  private route = inject(ActivatedRoute);

  constructor(private plazaService:PlazaService, private usuarioService:UsuarioService){}

  usuarioId = sessionStorage.getItem('usuarioId')
  viajeId = this.route.snapshot.paramMap.get('id');

  plaza:Plaza = {
    id: 0,
    nombre: '',
    correo: '',
    telefono: '',
    latitudRecogida: 0,
    longitudRegocida: 0,
    comentariosConductor: '',
    comentariosPasajero: '',
    aceptada: false,
    usuarioId: 0,
    imagen: '',
    viajeId: parseInt(this.viajeId!)
  }

  ngOnInit(){
    if(this.usuarioId){
      this.usuarioService.getUsuario(parseInt(this.usuarioId)).subscribe(data => {
        this.plaza.nombre = data.nombre;
        this.plaza.correo = data.correo;
        this.plaza.telefono = data.telefono;
        this.plaza.usuarioId = data.id;
      })
    }
  }

  submitSolicitud(){
    console.log(this.plaza)
    this.plazaService.createPlaza(this.plaza).subscribe()
    window.location.href="http://localhost:4200/viaje/" + this.viajeId
  }

}
