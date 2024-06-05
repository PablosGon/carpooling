import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nucleo } from '../entity/nucleo';

@Injectable({
  providedIn: 'root'
})
export class NucleoService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://localhost:7161/api/'

  public getNucleos():Observable<Nucleo[]>{
    return this.httpClient.get<Nucleo[]>(this.url + "nucleos");
  }

  public getNucleo(id:number):Observable<Nucleo>{
    return this.httpClient.get<Nucleo>(this.url + 'nucleos/' + id);
  }

  public getNucleosByMunicipioId(id:number):Observable<Nucleo[]>{
    return this.httpClient.get<Nucleo[]>(this.url + "nucleos?municipioId=" + id)
  }

  public createNucleo(nucleo:Nucleo):Observable<Nucleo>{
    return this.httpClient.post<Nucleo>(this.url + 'nucleos', nucleo)
  }

  public updateNucleo(id:number, nucleo:Nucleo):Observable<Nucleo>{
    return this.httpClient.put<Nucleo>(this.url + 'nucleos/' + id, nucleo)
  }

  public deletePicture(id:number):Observable<Nucleo>{
    return this.httpClient.put<Nucleo>(this.url + 'nucleos/' + id + '/deletePicture', {})
  }

  public deleteNucleo(id:number):Observable<Nucleo>{
    return this.httpClient.delete<Nucleo>(this.url + 'nucleos/' + id)
  }
}
