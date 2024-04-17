import { Component, inject } from '@angular/core';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ViajeService } from '../../services/viaje.service';
import { Viaje } from '../../entity/viaje';

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

  id = this.route.snapshot.paramMap.get('id');

  usuario:Usuario = {
    id: '',
    nombre: '',
    correo: '',
    telefono: '',
    valoraciones: [],
    imagenURL: ''
  }

  viajes:Viaje[] = [];

  getValoracionMedia():string{

    var out = 0;

    this.usuario.valoraciones.forEach(v => {
      out += v;
    });

    return (out / this.usuario.valoraciones.length).toFixed(1);
  }



  ngOnInit():void{
    this.initializeData()
  }

  async initializeData(){
    (await this.usuarioService.getUsuario(this.id!)).subscribe(data => {
      this.usuario.id = data.id;
      this.usuario.nombre = data.nombre;
      this.usuario.correo = data.correo;
      this.usuario.telefono = data.telefono;
      this.usuario.valoraciones = data.valoraciones;
      this.usuario.imagenURL = data.imagenURL
    });
    this.viajeService.getViajes().subscribe(data => {
      data.forEach((viaje) => {
        if(viaje.conductorId == this.id){
          this.viajes.push(viaje);
        }
      })
    })
  }

}
