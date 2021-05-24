import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  environment } from "../../environments/environment"
import { HttpClientService } from './httpclient.service';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  urlBack:String=environment.urlBack +"api/";

  constructor(
    private http:HttpClient,
  ) { }

    getAll(): Observable<any> {
      return this.http.get(this.urlBack + "store/all");
    }
    // Update Store
    update(id:any,data: any): Observable<any> {
      data={
        nom:data.name,
      }
      return this.http.post(this.urlBack + "updStore/"+id, data)
    }

    // Create Store
    create(data: any): Observable<any> {
      data={
        nom:data.name,

      }
      return this.http.post(this.urlBack + "addStore", data)
    }
    //
    archStore(id:any):Observable<any>{
      return this.http.get(this.urlBack+"archStore/"+id);
    }
    // Delete Store  
    delete(id: any): Observable<any> {
     return this.http.delete(this.urlBack+"delStore/"+id);
    }
}
