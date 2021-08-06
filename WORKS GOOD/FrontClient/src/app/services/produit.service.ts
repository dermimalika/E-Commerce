import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getProducts(){
    let token = sessionStorage.getItem("clienttoken");
    console.log("token in produit service:", token);
    
    return this.http.get("users/products", {headers: new HttpHeaders().set('Authorization', token!)});
  }
  getProduit(id:any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get("users/produit/"+id, {headers: new HttpHeaders().set('Authorization', token!)});
  }

}
