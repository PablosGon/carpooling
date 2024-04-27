import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../entity/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7161/api/'

  public getMunicipios():Observable<Municipio[]>{
    return this.httpClient.get<Municipio[]>(this.url + "municipios");
  }

  public getMunicipio(id:number):Observable<Municipio>{
    return this.httpClient.get<Municipio>(this.url + 'municipios/' + id);
  }
}
