import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../entity/municipio';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  constructor(private httpClient:HttpClient) { }

  url = environment.BASE_API_URL

  public getMunicipios():Observable<Municipio[]>{
    return this.httpClient.get<Municipio[]>(this.url + "municipios");
  }

  public getMunicipio(id:number):Observable<Municipio>{
    return this.httpClient.get<Municipio>(this.url + 'municipios/' + id);
  }

  public createMunicipio(municipio:Municipio):Observable<Municipio>{
    return this.httpClient.post<Municipio>(this.url + 'municipios', municipio)
  }

  public updateMunicipio(id:number, municipio:Municipio):Observable<Municipio>{
    return this.httpClient.put<Municipio>(this.url + 'municipios/' + id, municipio)
  }

  public deletePicture(id:number):Observable<Municipio>{
    return this.httpClient.put<Municipio>(this.url + 'municipios/' + id + '/deletePicture', {})
  }

  public deleteMunicipio(id:number):Observable<Municipio>{
    return this.httpClient.delete<Municipio>(this.url + 'municipios/' + id)
  }
}
