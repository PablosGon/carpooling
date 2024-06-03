import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { Usuario } from '../entity/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7161/api/'

  public getUsuarios(correo?:string, pass?:string):Observable<Usuario[]>{
    if(correo && pass){
      return this.httpClient.get<Usuario[]>(this.url + "usuarios?correo=" + correo + "&pass=" + pass);
    } else if (correo) {
      return this.httpClient.get<Usuario[]>(this.url + "usuarios?correo=" + correo);
    } else {
      return this.httpClient.get<Usuario[]>(this.url + "usuarios");
    }
  }

  public getUsuario(id:number):Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.url + 'usuarios/' + id);
  }

  public createUsuario(usuario:Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.url + 'usuarios', usuario);
  }

  public updateUsuario(id:number, usuario:Usuario):Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.url + 'usuarios/' + id, usuario)
  }

  public readAllNotifications(id:number):Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.url + 'usuarios/' + id + '/readNotifications', {})
  }

  public deleteProfilePicture(id:number):Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.url + 'usuarios/' + id + '/deletePicture', {})
  }

  public deleteUsuario(id:number):Observable<Usuario>{
    return this.httpClient.delete<Usuario>(this.url + 'usuarios/' + id)
  }
}
