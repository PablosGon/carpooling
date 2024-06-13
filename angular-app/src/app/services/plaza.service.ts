import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plaza } from '../entity/plaza';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlazaService {

  constructor(private httpClient:HttpClient) { }

  url = environment.BASE_API_URL

  public getPlazas():Observable<Plaza[]>{
    return this.httpClient.get<Plaza[]>(this.url + "plazas");
  }

  public getPlaza(id:number):Observable<Plaza>{
    return this.httpClient.get<Plaza>(this.url + 'plazas/' + id);
  }

  public getPlazasByViajeId(id:number):Observable<Plaza[]>{
    return this.httpClient.get<Plaza[]>(this.url + 'plazas?viajeId=' + id)
  }

  public createPlaza(plaza:Plaza):Observable<Plaza>{
    return this.httpClient.post<Plaza>(this.url + 'plazas', plaza)
  }

  public updatePlaza(id:number, plaza:Plaza):Observable<Plaza>{
    return this.httpClient.put<Plaza>(this.url + 'plazas/' + id, plaza)
  }

  public acceptPlaza(id:number):Observable<Plaza>{
    return this.httpClient.put<Plaza>(this.url + 'plazas/' + id + '/aceptar', {})
  }

  public deletePlaza(id:number):Observable<Plaza>{
    return this.httpClient.delete<Plaza>(this.url + 'plazas/' + id)
  }

}
