import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../entity/viaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://localhost:7194/api/'

  // headers:HttpHeaders = new HttpHeaders({
  //   "Content-Type":"application/json",
  //   "Access-Control-Allow-Origin": "*"
  // });

  public getViajes():Observable<Viaje[]> {
    return this.httpClient.get<Viaje[]>(this.url + 'viajes');
  }

  public getViaje(id:string):Observable<Viaje> {
    return this.httpClient.get<Viaje>(this.url + 'viajes/' + id);
  }

  public postViaje(viaje:Viaje){

    this.httpClient.post<Viaje>(this.url + 'viajes', {
      conductorId : '66084b57a065e8396b4384a9',
      hora : viaje.hora,
      maxPlazas : viaje.maxPlazas,
      isVuelta : true,
      comentarios : viaje.comentarios,
      descripcionCoche : viaje.descripcionCoche,
      solicitudes : [],
      plazas : [],
      nucleo : viaje.nucleo,
      centro : viaje.centro,
      precio : viaje.precio
    }).subscribe(data => console.log(data))

  }
}
