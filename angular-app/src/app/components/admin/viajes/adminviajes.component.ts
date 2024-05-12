import { Component } from '@angular/core';
import { Viaje } from '../../../entity/viaje';
import { ViajeService } from '../../../services/viaje.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-adminviajes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './adminviajes.component.html',
  styleUrl: './adminviajes.component.css'
})
export class AdminviajesComponent {

  viajes:Viaje[] = []

  constructor(private viajeService:ViajeService){}

  ngOnInit(){
    this.viajeService.getViajes().subscribe(data => this.viajes = data)
  }

  getSalida(id:number){
    let viaje:Viaje = this.viajes.find(x => x.id == id)!;
    return viaje.isVuelta ? viaje.centro : viaje.nucleo
  }

  getDestino(id:number){
    let viaje:Viaje = this.viajes.find(x => x.id == id)!;
    return !viaje.isVuelta ? viaje.centro : viaje.nucleo
  }

  deleteViaje(id:number){
    this.viajeService.deleteViaje(id).subscribe();
    window.location.reload();
  }

  updateViaje(id:number, viaje:Viaje){
    this.viajeService.updateViaje(id, viaje).subscribe();
    window.location.reload();
  }

}
