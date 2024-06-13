import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../entity/notificacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private httpClient:HttpClient) { }

  url = environment.BASE_API_URL

  public getNotificaciones():Observable<Notificacion[]>{
    return this.httpClient.get<Notificacion[]>(this.url + "notificaciones");
  }

  public getNotificacion(id:string):Observable<Notificacion>{
    return this.httpClient.get<Notificacion>(this.url + 'notificaciones/' + id);
  }

  public getNotificacionesByUsuarioId(usuarioId:number):Observable<Notificacion[]>{
    return this.httpClient.get<Notificacion[]>(this.url + "notificaciones?usuarioId=" + usuarioId);
  }

  public setAllNotificationsToRead(usuarioId:number){
    return this.httpClient.put(this.url + "markAsRead?usuarioId=" + usuarioId, {});
  }

  public deleteNotification(id:number){
    return this.httpClient.delete(this.url + "Notificaciones/" + id);
  }
}
