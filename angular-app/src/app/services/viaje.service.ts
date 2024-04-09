import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../entity/viaje';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://localhost:7194/api/'

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })

  public getViajes():Observable<Viaje[]> {
    return this.httpClient.get<Viaje[]>(this.url + 'viajes');
  }

  public getViaje(id:string):Observable<Viaje> {
    return this.httpClient.get<Viaje>(this.url + 'viajes/' + id);

  }
}

