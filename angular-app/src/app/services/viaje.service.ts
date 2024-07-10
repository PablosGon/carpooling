import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../entity/viaje';
import { Observable } from 'rxjs';
import { ViajeFilter } from '../pages/viajes/interfaces/viaje-filter';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private httpClient: HttpClient) { }

  url = environment.BASE_API_URL

  // headers:HttpHeaders = new HttpHeaders({
  //   "Content-Type":"application/json",
  //   "Access-Control-Allow-Origin": "*"
  // });

  public getViajes(filter:ViajeFilter, onlyUpcoming?:boolean, conductorId?:number, pasajeroId?:number):Observable<Viaje[]> {

    let url = this.url + 'viajes'
    let params:HttpParams = new HttpParams()

    if(filter.universidadId) params = params.set('universidadId', filter.universidadId);
    if(filter.centroId) params = params.set('centroId', filter.centroId);
    if(filter.municipioId) params = params.set('municipioId', filter.municipioId);
    if(filter.nucleoId) params = params.set('nucleoId', filter.nucleoId);
    if(filter.isVuelta != null) params = params.set('isVuelta', filter.isVuelta);
    if(filter.fechaYHora) params = params.set('fechaHora', filter.fechaYHora.toString());
    if(onlyUpcoming) params = params.set('onlyUpcoming', onlyUpcoming);
    if(conductorId) params = params.set('conductorId', conductorId);
    if(pasajeroId) params = params.set('pasajeroId', pasajeroId);

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
