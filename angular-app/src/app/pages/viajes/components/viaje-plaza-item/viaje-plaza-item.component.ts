import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plaza } from '../../../../entity/plaza';
import { ProfileComponent } from '../../../../shared/components/profile/profile.component';
import { Profile } from '../../../../shared/interfaces/profile.interface';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viaje-plaza-item',
  standalone: true,
  imports: [ProfileComponent, NgbAccordionModule],
  templateUrl: './viaje-plaza-item.component.html',
  styleUrl: './viaje-plaza-item.component.css'
})
export class ViajePlazaItemComponent {

  @Input() public plaza?:Plaza

  @Output() onAccept = new EventEmitter<number>()
  @Output() onReject = new EventEmitter<number>()
  @Output() onDelete = new EventEmitter<number>()

  accept(){
    this.onAccept.emit(this.plaza?.id)
  }

  reject(){
    this.onReject.emit(this.plaza?.id)
  }

  remove(){
    this.onDelete.emit(this.plaza?.id)
  }

}
