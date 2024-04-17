import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nucleo } from '../entity/nucleo';

@Injectable({
  providedIn: 'root'
})
export class NucleoService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7194/api/'

  public getNucleos():Observable<Nucleo[]>{
    return this.httpClient.get<Nucleo[]>(this.url + "nucleos");
  }

  public getNucleo(id:string):Observable<Nucleo>{
    return this.httpClient.get<Nucleo>(this.url + 'nucleos/' + id);
  }
}
