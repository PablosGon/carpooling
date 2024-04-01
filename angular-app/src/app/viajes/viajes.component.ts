import { Component } from '@angular/core';
import { ViajeService } from '../services/viaje.service';
import { toArray } from 'rxjs';
import { Viaje } from '../entity/viaje';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})
export class ViajesComponent {


  constructor(private viajeService: ViajeService){ }

  viajes: Viaje[] = this.viajeService.getViajes()


}
