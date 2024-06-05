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

  url = 'https://localhost:7161/api/'

  public getCentros():Observable<Centro[]>{
    return this.httpClient.get<Centro[]>(this.url + "centros");
  }

  public getCentro(id:number):Observable<Centro>{
    return this.httpClient.get<Centro>(this.url + 'centros/' + id);
  }

  public getCentrosByUniversidadID(id:number):Observable<Centro[]>{
    return this.httpClient.get<Centro[]>(this.url + "centros?universidadId=" + id)
  }

  public createCentro(centro:Centro):Observable<Centro>{
    return this.httpClient.post<Centro>(this.url + 'centros', centro)
  }

  public updateCentro(id:number, centro:Centro):Observable<Centro>{
    return this.httpClient.put<Centro>(this.url + 'centros/' + id, centro)
  }

  public deletePicture(id:number):Observable<Centro>{
    return this.httpClient.put<Centro>(this.url + 'centros/' + id + '/deletePicture', {})
  }

  public deleteCentro(id:number):Observable<Centro>{
    return this.httpClient.delete<Centro>(this.url + 'centros/' + id)
  }
}
