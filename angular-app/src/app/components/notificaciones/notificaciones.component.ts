import { Component, inject } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Notificacion } from '../../entity/notificacion';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent {

  private route = inject(ActivatedRoute);

  constructor(private notificacionService:NotificacionesService, private router:Router, private usuarioService:UsuarioService){ }

  usuarioId : number = parseInt(this.route.snapshot.paramMap.get('id')!);
  notificaciones : Notificacion[] = []

  ngOnInit(){
    this.notificacionService.getNotificacionesByUsuarioId(this.usuarioId).subscribe(data => {
      data.forEach(noti => this.notificaciones.push(noti));
      this.usuarioService.readAllNotifications(this.usuarioId).subscribe()
    })
  }

  deleteNotification(id:number){
    this.notificacionService.deleteNotification(id).subscribe();
    window.location.reload();
  }

}
