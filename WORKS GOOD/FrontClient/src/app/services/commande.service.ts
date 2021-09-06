import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) { }

  getPanier(){
    let token = sessionStorage.getItem("clienttoken");
    let client = sessionStorage.getItem("client");
    return this.http.get("panier/getPanierItems?user_id="+JSON.parse(client!).id, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  addPanier(body:any){
    let token = sessionStorage.getItem("clienttoken");
    let client = sessionStorage.getItem("client");

    return this.http.post("panier/add?user_id="+JSON.parse(client!).id,body, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  UpdPanier(id:any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.post("panier/update"+id, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  deletePanier(id:any){
    let token = sessionStorage.getItem("clienttoken");
    let client = sessionStorage.getItem("client");
    return this.http.delete("panier/delete?&id="+id+"&user_id="+JSON.parse(client!).id, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  getOrder(){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get("order/getOrders", {headers: new HttpHeaders().set('Authorization', token!)});
  }

  addOrder(){
    let token = sessionStorage.getItem("clienttoken");
    let client = sessionStorage.getItem("client");
    return this.http.post("order/add?user_id="+JSON.parse(client!).id,{client}, {headers: new HttpHeaders().set('Authorization', token!)});
  }
}
