import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Viaje } from '../../../entity/viaje';

@Component({
  selector: 'app-viaje-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './viaje-item.component.html',
  styleUrl: './viaje-item.component.css'
})
export class ViajeItemComponent {

  @Input() viaje?:Viaje

  destino(){
    return this.viaje!.isVuelta ? this.viaje!.nucleo.nombre : this.viaje!.centro.nombre
  }

  salida(){
    return this.viaje!.isVuelta ? this.viaje!.centro.nombre : this.viaje!.nucleo.nombre
  }

}
