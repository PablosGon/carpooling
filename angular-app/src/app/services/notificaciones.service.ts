import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notificacion } from '../entity/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7161/api/'

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
    console.log("https://localhost:7161/markAsRead?usuarioId=" + usuarioId)
    return this.httpClient.put("https://localhost:7161/markAsRead?usuarioId=" + usuarioId, {});
  }

  public deleteNotification(id:number){
    return this.httpClient.delete("https://localhost:7161/api/Notificaciones/" + id);
  }
}
