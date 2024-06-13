import { Component, Input } from '@angular/core';
import { Viaje } from '../../../../entity/viaje';
import { RouterLink } from '@angular/router';
import { ViajeItemComponent } from '../viaje-item/viaje-item.component';

@Component({
  selector: 'app-viaje-list',
  standalone: true,
  imports: [RouterLink, ViajeItemComponent],
  templateUrl: './viaje-list.component.html',
  styleUrl: './viaje-list.component.css'
})
export class ViajeListComponent {

  @Input() viajes?:Viaje[]

}
