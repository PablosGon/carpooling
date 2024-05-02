import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../entity/viaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://localhost:7161/api/'

  // headers:HttpHeaders = new HttpHeaders({
  //   "Content-Type":"application/json",
  //   "Access-Control-Allow-Origin": "*"
  // });

  public getViajes(centroId?:number, nucleoId?:number, isVuelta?:boolean, fecha?:Date):Observable<Viaje[]> {

    let url = this.url + 'viajes'

    console.log(centroId, nucleoId)

    if(centroId && centroId != 0 && nucleoId && nucleoId != 0){
      console.log("entramos chavales")
      url = url + '?centroId=' + centroId + '&nucleoId=' + nucleoId + '&isVuelta=' + isVuelta
    }
    
    if(fecha){
      url = url + '&fechaHora=' + fecha
    }

    return this.httpClient.get<Viaje[]>(url);
  }

  public getViaje(id:number):Observable<Viaje> {
    return this.httpClient.get<Viaje>(this.url + 'viajes/' + id);
  }

  public postViaje(viaje:Viaje):Observable<Viaje>{
    return this.httpClient.post<Viaje>(this.url + 'viajes', viaje)
  }

  public updateViaje(id:number, viaje:Viaje):Observable<Viaje>{
    return this.httpClient.put<Viaje>(this.url + 'viajes/' + id, viaje)
  }

  public deleteViaje(id:number):Observable<Viaje>{
    return this.httpClient.delete<Viaje>(this.url + 'viajes/' + id)
  }
}
