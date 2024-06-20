import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../entity/usuario';
import { Observable } from 'rxjs';
import { Centro } from '../entity/centro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  constructor(private httpClient:HttpClient) { }

  url = environment.BASE_API_URL

  public getCentros(universidadId?:number):Observable<Centro[]>{

    if(universidadId){
      return this.httpClient.get<Centro[]>(this.url + "centros?universidadId=" + universidadId)
    } else {
      return this.httpClient.get<Centro[]>(this.url + "centros");
    }

  }

  public getCentro(id:number):Observable<Centro>{
    return this.httpClient.get<Centro>(this.url + 'centros/' + id);
  }

  public createCentro(centro:Centro):Observable<Centro>{
    return this.httpClient.post<Centro>(this.url + 'centros', centro)
  }

  public updateCentro(id:number, centro:Centro):Observable<Centro>{
    return this.httpClient.put<Centro>(this.url + 'centros/' + id, centro)
  }

  public deletePicture(id:number):Observable<Centro>{
    return this.httpClient.put<Centro>(this.url + 'centros/' + id + '/deletePicture', {})
  }

  public deleteCentro(id:number):Observable<Centro>{
    return this.httpClient.delete<Centro>(this.url + 'centros/' + id)
  }
}
