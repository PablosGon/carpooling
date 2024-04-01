import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../entity/viaje';
import { first } from 'rxjs';

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

  public getViajes(): Viaje[] {
    var res = this.httpClient.get<any>(this.url + 'viajes');

    var out: Viaje[] = []
    res.subscribe(viajes => {
      viajes.forEach((viaje: Viaje) => {
        out.push(viaje)
      });
    })

    console.log(out)

    return out;
  }
}

