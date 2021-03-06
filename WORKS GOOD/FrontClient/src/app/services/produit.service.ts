import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }
//================> Products
  getProducts(){
    let token = sessionStorage.getItem("clienttoken");
    console.log("token in produit service:", token);
    
    return this.http.get("users/products", {headers: new HttpHeaders().set('Authorization', token!)});
  }

    //for Products
    getAllProducts(params: any): Observable<any> {
      let token = sessionStorage.getItem("clienttoken");
      console.log("params in produit service products getall :",params);
      console.log("params in produit service Products getall attribut pages:",params.page);
  
      return this.http.get("users/products?page="+params.page, {params});
    }

  //for Products Filter with Category
    getAllProductCategory(params: any): Observable<any> {
      let token = sessionStorage.getItem("clienttoken");
      console.log("params in produit service products getallCategory :",params);
      console.log("params in produit service Products getallCategory attribut category:",params.category);
      
      return this.http.get("users/products/cat?page="+params.page, {params});
    }
  //for Products Filter with Key Word
    getAllProductFilter(params: any): Observable<any> {
      let token = sessionStorage.getItem("clienttoken");
      console.log("params in produit service products getallCategory :",params);
      console.log("params in produit service Products getallFilter attribut filter:",params.filter);
      
    return this.http.get("users/products/search?page="+params.page, {params});
  }  
    
  getProduit(id:any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get("users/produit/"+id);
  }
  //=======================================================================>
  //============>  Category
   // Get All categories
   getCategorys() {
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get('users/getCategorys');
  }
  //=======================================================================>
    //==========>  Comments

  //for Comments
  getAll(id:any,params: any): Observable<any> {
    let token = sessionStorage.getItem("clienttoken");
    console.log("params in produit service getall :",params);
    console.log("params in produit service getall attribut pages:",params.page);

    return this.http.get("users/products/"+id+"/comments?page="+params[`page`], {params,headers: new HttpHeaders().set('Authorization', token!)});
  }

  getComments(id: any){
    ///users/products/
    let token = sessionStorage.getItem("clienttoken");
    return this.http.get("users/products/"+id+"/comments",{headers: new HttpHeaders().set('Authorization', token!)});
  }

  addComments(id: any,data:any){
    let client =JSON.parse(sessionStorage.getItem("client")!) ;
    let C={
      comment:data,
      idClient:client.id,
    }

    console.log("comment in service produit :",C);

    let token = sessionStorage.getItem("clienttoken");
    return this.http.post("users/products/comments/"+id,C, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  updateComments(produit:any,comment:any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.put("/users/products/"+produit+"/comments/"+comment, {headers: new HttpHeaders().set('Authorization', token!)});
  }

  deleteComment(produit:any,comment:any){
    let token = sessionStorage.getItem("clienttoken");
    return this.http.delete("/users/products/"+produit+"/comments/"+comment, {headers: new HttpHeaders().set('Authorization', token!)});
  }
}
