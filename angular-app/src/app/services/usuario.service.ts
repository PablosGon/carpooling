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

  public getUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.url + "usuarios");
  }

  public getUsuario(id:number):Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.url + 'usuarios/' + id);
  }

  public createUsuario(usuario:Usuario):Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.url + 'usuarios', usuario);
  }

  public readAllNotifications(id:number):Observable<Usuario>{
    return this.httpClient.put<Usuario>(this.url + 'usuarios/' + id + '/readNotifications', {})
  }
}
