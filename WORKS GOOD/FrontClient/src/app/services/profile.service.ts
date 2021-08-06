import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(id:any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get("users/profile/"+id, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  update(data:any,id:any){
    let token = sessionStorage.getItem("clienttoken");
    console.log("update Profile Service :",data);
    return this.http.post("users/update/"+id,data,{headers: new HttpHeaders().set('Authorization', token!)});
  }
}
