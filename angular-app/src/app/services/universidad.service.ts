import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Universidad } from '../entity/universidad';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversidadService {

  constructor(private httpClient:HttpClient) { }

  url = environment.BASE_API_URL

  public getUniversidades():Observable<Universidad[]>{
    return this.httpClient.get<Universidad[]>(this.url + "universidades");
  }

  public getUniversidad(id:number):Observable<Universidad>{
    return this.httpClient.get<Universidad>(this.url + 'universidades/' + id);
  }

  public createUniversidad(universidad:Universidad):Observable<Universidad>{
    return this.httpClient.post<Universidad>(this.url + 'universidades/', universidad)
  }

  public updateUniversidad(id:number, universidad:Universidad):Observable<Universidad>{
    return this.httpClient.put<Universidad>(this.url + 'universidades/' + id, universidad)
  }

  public deletePicture(id:number):Observable<Universidad>{
    return this.httpClient.put<Universidad>(this.url + 'universidades/' +  id + '/deletePicture', {})
  }

  public deleteUniversidad(id:number):Observable<Universidad>{
    return this.httpClient.delete<Universidad>(this.url + 'universidades/' + id)
  }
}
