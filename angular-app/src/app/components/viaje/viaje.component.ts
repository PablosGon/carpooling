import { Component, Input, inject } from '@angular/core';
import { ViajeService } from '../../services/viaje.service';
import { Viaje } from '../../entity/viaje';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Usuario } from '../../entity/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-viaje',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './viaje.component.html',
  styleUrl: './viaje.component.css'
})
export class ViajeComponent {

  private route = inject(ActivatedRoute);

  constructor(private viajeService: ViajeService, private usuarioService: UsuarioService){ }

  id = this.route.snapshot.paramMap.get('id');
  viaje:Viaje = {
    id: "",
    nucleo: '',
    centro: '',
    hora: new Date(),
    isvuelta: false,
    conductorId: '',
    maxPlazas: 0,
    comentarios: '',
    descripcionCoche: '',
    solicitudes: [],
    plazas: [],
    precio: 0
  };
  dateTime:Date = new Date(this.viaje?.hora!);
  conductor:Usuario = {
    id: '',
    nombre: '',
    correo: '',
    telefono: '',
    valoraciones: [],
    imagenURL: ''
  }

  getValoracionMedia():string{

    var out = 0;

    this.conductor.valoraciones.forEach(v => {
      out += v;
    });

    return (out / this.conductor.valoraciones.length).toFixed(1);
  }
  
  ngOnInit(){
    this.initializeData();
  }

  async initializeData(){
    (await this.viajeService.getViaje(this.id!)).subscribe(data => {
      console.log(data)
      this.viaje.id = data.id;
      this.viaje.conductorId = data.conductorId;
      this.viaje.hora = new Date(data.hora);
      this.viaje.maxPlazas = data.maxPlazas;
      this.viaje.isvuelta = data.isvuelta;
      this.viaje.comentarios = data.comentarios;
      this.viaje.descripcionCoche = data.descripcionCoche;
      this.viaje.solicitudes = data.solicitudes;
      this.viaje.plazas = data.plazas;
      this.viaje.nucleo = data.nucleo;
      this.viaje.centro = data.centro;
      this.usuarioService.getUsuario(this.viaje.conductorId).subscribe(data => {
        console.log(data);
        this.conductor.id = data.id;
        this.conductor.nombre = data.nombre;
        this.conductor.correo = data.correo;
        this.conductor.telefono = data.telefono;
        this.conductor.valoraciones = data.valoraciones;
      })
      
    });
    
    console.log(this.viaje.conductorId);
    

  }

}
