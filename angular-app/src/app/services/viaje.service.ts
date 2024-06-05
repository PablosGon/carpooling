import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public getViajes(centroId?:number, nucleoId?:number, isVuelta?:boolean, fecha?:Date, universidadId?:number, municipioId?:number):Observable<Viaje[]> {

    let url = this.url + 'viajes'
    let params:HttpParams = new HttpParams()

    if(universidadId) params.append('universidadId', universidadId);
    if(centroId) params.append('centroId', centroId);
    if(municipioId) params.append('municipioId', municipioId);
    if(nucleoId) params.append('nucleoId', nucleoId);
    if(isVuelta != null) params.append('isVuelta', isVuelta);
    if(fecha) params.append('fechaHora', fecha.toString());


    return this.httpClient.get<Viaje[]>(url, {
      params: params
    });
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
