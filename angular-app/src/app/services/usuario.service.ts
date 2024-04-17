import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, tap } from 'rxjs';
import { Usuario } from '../entity/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7194/api/'

  public getUsuarios():Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.url + "usuarios");
  }

  public getUsuario(id:string):Observable<Usuario>{
    return this.httpClient.get<Usuario>(this.url + 'usuarios/' + id);
  }
}
