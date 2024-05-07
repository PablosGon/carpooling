import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient:HttpClient) { }

  public uploadImage(){
    //this.httpClient.post()
  }


}
