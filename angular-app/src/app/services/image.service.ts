import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient:HttpClient) { }

  url = 'https://api.cloudinary.com/v1_1/dilfzvvw4/'

  public uploadImage(file:string):Observable<Object>{
    console.log(file)
    return this.httpClient.post(this.url + 'upload', {
      upload_preset:"default",
      file:file
    })
  }


}
