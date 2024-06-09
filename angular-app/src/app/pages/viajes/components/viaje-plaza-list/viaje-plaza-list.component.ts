import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViajePlazaItemComponent } from '../viaje-plaza-item/viaje-plaza-item.component';
import { Plaza } from '../../../../entity/plaza';

@Component({
  selector: 'app-viaje-plaza-list',
  standalone: true,
  imports: [ViajePlazaItemComponent],
  templateUrl: './viaje-plaza-list.component.html',
  styleUrl: './viaje-plaza-list.component.css'
})
export class ViajePlazaListComponent {

  @Input() public plazaList:Plaza[] = []

  @Output() onPlazaAccept = new EventEmitter<number>()
  @Output() onPlazaReject = new EventEmitter<number>()
  @Output() onPlazaDelete = new EventEmitter<number>()
  
  acceptPlaza(id:number){
    this.onPlazaAccept.emit(id)
  }

  rejectPlaza(id:number){
    this.onPlazaReject.emit(id)
  }

  deletePlaza(id:number){
    this.onPlazaDelete.emit(id)
  }
}
