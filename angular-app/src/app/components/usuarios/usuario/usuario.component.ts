import { Component, inject } from '@angular/core';
import { Usuario } from '../../../entity/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ViajeService } from '../../../services/viaje.service';
import { Viaje } from '../../../entity/viaje';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  private route = inject(ActivatedRoute);

  constructor(private usuarioService:UsuarioService, private viajeService:ViajeService){}

  id = parseInt(this.route.snapshot.paramMap.get('id')!);

  usuario:Usuario = {
    id: 0,
    nombre: '',
    correo: '',
    telefono: '',
    grado: '',
    imagen: '',
    universidad: {
      id: 0,
      nombre: ''
    },
    municipio: {
      id: 0,
      nombre: ''
    }
  }

  viajes:Viaje[] = [];

  ngOnInit():void{
    this.initializeData()
  }

  async initializeData(){
    (await this.usuarioService.getUsuario(this.id!)).subscribe(data => {
      this.usuario.id = data.id;
      this.usuario.nombre = data.nombre;
      this.usuario.correo = data.correo;
      this.usuario.telefono = data.telefono;
      this.usuario.imagen = data.imagen
    });
    this.viajeService.getViajes().subscribe(data => {
      data.forEach((viaje) => {
        if(viaje.conductor.id == this.id){
          this.viajes.push(viaje);
        }
      })
    })
  }

}
