import { Component, inject } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Notificacion } from '../../entity/notificacion';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { NotificacionItemComponent } from './notificacion-item/notificacion-item.component';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [RouterModule, NotificacionItemComponent],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {

  private route = inject(ActivatedRoute);

  constructor(private notificacionService:NotificacionesService, private router:Router, private usuarioService:UsuarioService){ }

  usuarioId = sessionStorage.getItem("usuarioId")
  notificaciones : Notificacion[] = []

  ngOnInit(){
    this.notificacionService.getNotificacionesByUsuarioId(parseInt(this.usuarioId!)).subscribe(data => {
      data.forEach(noti => this.notificaciones.push(noti));
      this.usuarioService.readAllNotifications(parseInt(this.usuarioId!)).subscribe()
    })
  }

  deleteNotification(id:number){
    this.notificacionService.deleteNotification(id).subscribe(data => {
      window.location.reload();
    });
  }

}
