import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/usuario';
import { Observable } from 'rxjs';
import { Centro } from '../entity/centro';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7194/api/'

  public getCentros():Observable<Centro[]>{
    return this.httpClient.get<Centro[]>(this.url + "centros");
  }

  public getCentro(id:string):Observable<Centro>{
    return this.httpClient.get<Centro>(this.url + 'centros/' + id);
  }
}
