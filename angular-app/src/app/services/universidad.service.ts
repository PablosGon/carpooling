import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universidad } from '../entity/universidad';

@Injectable({
  providedIn: 'root'
})
export class UniversidadService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7194/api/'

  public getUniversidades():Observable<Universidad[]>{
    return this.httpClient.get<Universidad[]>(this.url + "universidades");
  }

  public getUniversidad(id:string):Observable<Universidad>{
    return this.httpClient.get<Universidad>(this.url + 'universidades/' + id);
  }
}
