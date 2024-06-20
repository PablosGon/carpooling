import { Component } from '@angular/core';
import { ViajeService } from '../../../services/viaje.service';
import { Viaje } from '../../../entity/viaje';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ViajeListComponent } from './viaje-list/viaje-list.component';
import { ViajeFilterComponent } from './viaje-filter/viaje-filter.component';
import { ViajeFilter } from '../interfaces/viaje-filter';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, ViajeListComponent, ViajeFilterComponent],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})

export class ViajesComponent {

  constructor(private viajeService:ViajeService, private usuarioService:UsuarioService) {}

  viajes: Viaje[] = [];

  usuarioId = sessionStorage.getItem('usuarioId')

  viajeFilter:ViajeFilter = {}

  ngOnInit():void{
    if(this.usuarioId){
      this.usuarioService.getUsuario(parseInt(this.usuarioId)).subscribe(data => {
        if(data.universidad && data.universidad.id != 0) this.viajeFilter.universidadId = data.universidad.id
        if(data.municipio && data.municipio.id != 0) this.viajeFilter.municipioId = data.municipio.id
      })
    }
    this.viajeService.getViajes(this.viajeFilter, true).subscribe(data => {this.viajes = data})
  }

  filtrar(filter:ViajeFilter){
    this.viajeService.getViajes(filter, true).subscribe(data => {this.viajes = data})
  }

}
