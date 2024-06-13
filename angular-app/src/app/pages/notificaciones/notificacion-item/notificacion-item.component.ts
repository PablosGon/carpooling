import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notificacion } from '../../../entity/notificacion';

@Component({
  selector: 'app-notificacion-item',
  standalone: true,
  imports: [],
  templateUrl: './notificacion-item.component.html',
  styleUrl: './notificacion-item.component.css'
})
export class NotificacionItemComponent {


  @Input() noti?:Notificacion

  @Output() onDeleteClick = new EventEmitter<number>()

  deleteNotification(id: number) {
    this.onDeleteClick.emit(id);
  }

}
