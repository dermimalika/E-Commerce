import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  getProducts(){
    let token = sessionStorage.getItem("clienttoken");
    
    return this.http.get("users/products", {headers: new HttpHeaders().set('Authorization', token!)});
  }
  getProduit(id:any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get("users/produit/"+id, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  getComments(id: any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get("/products/"+id+"/comments", {headers: new HttpHeaders().set('Authorization', token!)});
  }
  
  addComments(id: any){
    let client =JSON.parse(sessionStorage.getItem("client")!) ;
    let comment={
      //comment
      //id produit
      idClient:client.id,
      pictureClient:client.avater,
    }

    let token = sessionStorage.getItem("clienttoken");
    return this.http.post("/products/"+id+"/comments", {headers: new HttpHeaders().set('Authorization', token!)});
  }
  updateComments(produit:any,comment:any){
  let token = sessionStorage.getItem("clienttoken");
    return this.http.put("/products/"+produit+"/comments/"+comment, {headers: new HttpHeaders().set('Authorization', token!)});
  }
  deleteComment(produit:any,comment:any){
    let token = sessionStorage.getItem("clienttoken");
      return this.http.delete("/products/"+produit+"/comments/"+comment, {headers: new HttpHeaders().set('Authorization', token!)});
    }

}
