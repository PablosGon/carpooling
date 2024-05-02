import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Valoracion } from '../entity/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://localhost:7161/api/'

  // headers:HttpHeaders = new HttpHeaders({
  //   "Content-Type":"application/json",
  //   "Access-Control-Allow-Origin": "*"
  // });

  public getValoraciones(conductorId:number, pasajeroId:number):Observable<Valoracion[]> {

    let url = this.url + 'valoraciones/'

    if(conductorId && pasajeroId){
      url += '?conductorId=' + conductorId + '&pasajeroId=' + pasajeroId
    }

    return this.httpClient.get<Valoracion[]>(url);
  }

  public getValoracion(id:number):Observable<Valoracion> {
    return this.httpClient.get<Valoracion>(this.url + 'valoraciones/' + id);
  }

  public postValoracion(Valoracion:Valoracion):Observable<Valoracion>{
    return this.httpClient.post<Valoracion>(this.url + 'valoraciones', Valoracion)
  }

  public updateValoracion(id:number, Valoracion:Valoracion):Observable<Valoracion>{
    return this.httpClient.put<Valoracion>(this.url + 'valoraciones/' + id, Valoracion)
  }

  public deleteValoracion(id:number):Observable<Valoracion>{
    return this.httpClient.delete<Valoracion>(this.url + 'valoraciones/' + id)
  }
}
