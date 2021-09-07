import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { environment } from "src/environments/environment";
export class Admin {
  constructor(
    public id: string,
    public name: string,
    public phone: string,
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {

  // This URL :=> http://localhost:8080/
  urlBack:String=environment.urlBack;
  
  constructor(private httpClient: HttpClient) {}

  /*----------------------------------------------
  ----- This Service Contain CRUD operations -----
  -------- For Admin , Category ,Product ---------
  ------------------------------------------------*/ 
  //=================> Admin Queries <=======================================

  // Get All Admins
  getAdmins() {
    console.log("Admin service get Admins");
    return this.httpClient.get(this.urlBack+"admins/all");
  }
  // Delete Admin
  public deleteAdmin(id: number) :Observable<any>{
    return this.httpClient.delete(this.urlBack+"admins/delAdmin" + "/" +id);
  }
  // Add Admin
  public createAdmin(user : any): Observable<any> {
    console.log("id store in service:",user.store);
    
    return this.httpClient.post(this.urlBack+"register",user);
    }
      //UPDATE ADMIN
      updateAdmin(id:any,data: any): Observable<any> {
        data={
          name:data.name,
          phone:data.phone,
          username:data.username
        }
        return this.httpClient.post( "http://localhost:8080/admins/update/"+id, data)
      }
    
  
  // Archiver Admin
   public archAdmin( id:any ):Observable<any>{
      return this.httpClient.get(this.urlBack+"admins/archAdmin/"+id);
    }  
  // Restore Admin
   public restoreAdmin(id:any):Observable<any>{
      return this.httpClient.get(this.urlBack+"admins/restoreAdmin/"+id);
    }

  //============================================================================
  
  //========================> Categories Queries <==============================
  
  // Get ALl categories
  getCategorys() {
    return this.httpClient.get<Category[]>(this.urlBack+'categorys/get');
  }
  
  // Add New Categories
  addCategory(newCategory: Category) {
    return this.httpClient.post<Category>(this.urlBack+'categorys/add', newCategory);
  }

  // Delete Category
  deleteCategory(id : any) {
    return this.httpClient.delete<Category>(this.urlBack+'categorys/delCategory/' + id);
  }
  
  // Archiver Category
  public archCategory( id:any ):Observable<any>{
     return this.httpClient.get(this.urlBack+"categorys/archCategory/"+id);
  }
  // Restore Category
  public restoreCategory(id:any):Observable<any>{
     return this.httpClient.get(this.urlBack+"categorys/restoreCategory/"+id);
  }
  //======  
  //=====================================================================

  //========================> Products Queries <================================
  //Get ALl Products
  getProducts() {
    return this.httpClient.get<Product[]>(this.urlBack+'products/get');
  }

  //Upload Images
  // addUploadData(selectedFile) {
  //   return this.httpClient.post(this.urlBack+'products/upload', selectedFile);
  // }

  // // Add New Product
  // addProduct(newProduct) {
  //   console.log('we just pass here http client add product');
    
  //   return this.httpClient.post<Product>(this.urlBack+'products/add', newProduct);
  // }

  //Delete Product
  deleteProduct(id) {
    return this.httpClient.delete<Product>(this.urlBack+'products/delProduct/'+ id);
  }

  //Update Product
  updateProduct(id:any,updatedProduct: Product):Observable<any> {    
    return this.httpClient.post<Product>(this.urlBack+"products/update/"+id, updatedProduct);
  }

  // Archiver Produit
  public archProduit( id:any ):Observable<any>{
    return this.httpClient.get(this.urlBack+"products/archProduct/"+id);
  } 
  
  // Restore Product
  public restoreProduct(id:any):Observable<any>{
      return this.httpClient.get(this.urlBack+"products/restoreProduct/"+id);
  }
  //======
  //================================================================================
}