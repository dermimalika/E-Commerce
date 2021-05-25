import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from '../model/Category';
import { Product } from '../model/Product';
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
  constructor(private httpClient: HttpClient) {}

  getAdmins() {
    console.log("Admin service get Admins");
    return this.httpClient.get("http://localhost:8080/admins/all");
  }

  public deleteAdmin(id: number) :Observable<any>{
    return this.httpClient.delete(
      "http://localhost:8080/admins/delAdmin" + "/" +id
    );
  }

  public createAdmin(user : Object): Observable<Object> {
    return this.httpClient.post(
      "http://localhost:8080/register",
      user
    );
  }






  
  getCategorys() {
    return this.httpClient.get<Category[]>('http://localhost:8080/categorys/get');
  }

  addCategory(newCategory: Category) {
    return this.httpClient.post<Category>('http://localhost:8080/categorys/add', newCategory);
  }

  deleteCategory(id) {
    return this.httpClient.delete<Category>('http://localhost:8080/categorys/' + id);
  }

  getProducts() {
    return this.httpClient.get<Product[]>('http://localhost:8080/products/get');
  }

  addUploadData(selectedFile) {
    return this.httpClient.post('http://localhost:8080/products/upload', selectedFile);
  }

  addProduct(newProduct) {
    return this.httpClient.post<Product>('http://localhost:8080/products/add', newProduct);
  }

  deleteProduct(id) {
    return this.httpClient.delete<Product>('http://localhost:8080/products/' + id);
  }

  updateProduct(updatedProduct: Product) {
    return this.httpClient.put<Product>('http://localhost:8080/products/update', updatedProduct);
  }

}
