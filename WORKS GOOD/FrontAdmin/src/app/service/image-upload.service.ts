import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  private baseUrl = environment.urlBack;

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    //=============================================================
    console.log("selected File : ",file);
    console.log("selected File Name: ",file.name);
    
    formData.append('file', file, file.name);
    //=============================================================


    const req = new HttpRequest('POST', `${this.baseUrl}products/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}products/files`);
  }

}
