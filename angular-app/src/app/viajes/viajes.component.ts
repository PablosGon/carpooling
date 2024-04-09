import { Component } from '@angular/core';
import { ViajeService } from '../services/viaje.service';
import { toArray } from 'rxjs';
import { Viaje } from '../entity/viaje';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-viajes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})

export class ViajesComponent {

  constructor(private viajeService: ViajeService){ }

  viajes?: Viaje[];

  ngOnInit():void{
    this.viajeService.getViajes().subscribe(data => {this.viajes = data})
  }


}
