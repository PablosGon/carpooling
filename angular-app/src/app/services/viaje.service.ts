import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Viaje } from '../entity/viaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  constructor(private httpClient: HttpClient) { }

  url = 'https://localhost:7194/api/'

  public getViajes():Observable<Viaje[]> {
    return this.httpClient.get<Viaje[]>(this.url + 'viajes');
  }

  public async getViaje(id:string) {
    return this.httpClient.get<Viaje>(this.url + 'viajes/' + id);
  }
}
