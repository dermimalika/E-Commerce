import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../model/Product';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService } from '../service/httpclient.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.component.html',
  styleUrls: ['./recycle.component.css']
})
export class RecycleComponent implements OnInit {
  mode:String="main"                  // Mode Of display [main,stores,admins,products,categories]
  stores:any[]                        //List of Stores
  admins:any[]                        //List of Admins
  products:any[]                      //List of Products
  categories:any[]                    //List of categories
  super:any
  products1: any;

  constructor(private storeService: StoreService,
    private httpClientService: HttpClientService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService,
    private authService:AuthenticationService,) { }

  ngOnInit(): void {
    this.super=this.authService.isRoleSuper();
    if(this.super){
      this.getStores();
      this.getAdmins();
    }
    this.getProducts();
    this.getCategories();

    }
    // ----------------> Store <-------------------------------- 
    //-> Get All Stores
    getStores(){
      this.storeService.getAll().subscribe((data: any)=>{
        this.stores=data;
        console.log("in constructor in store :",this.stores);
      });
    }
    //================
    //->Restore Store
    restoreStore(id:any){
      return this.storeService.restoreStore(id).subscribe((data:any)=>{
        if( data){
          this.toastr.success('Restore Store!', 'Store has been restored successfuly'); 
          this.getStores();
          this.mode="main";
          this.document.location.reload();
        }
        else{
          this.toastr.error('Restore Store!', 'Try Again '); 
        }
      })
    }
    //================

    //-> Delete Store
    delStore( id:any){
      console.log("Delete Store");
      if(confirm('Are you sure to delete this store ?')){
        return this.storeService.delete(id)
        .subscribe((data:any)=>{
          if(data){
             this.toastr.success('Delete Store!', 'Store has been deleted successfuly'); 
              this.getStores();
              this.document.location.reload();
              
          }else{
            this.toastr.error('Delete Store!', 'Try Again ');  
            
          }
        })
        // To GO back to List View
        ,this.mode="list"
      }
      return true
      
    }
    //================
    // -------------------------------------------------------------------------------

    //----------------------------- Admins ---------------------------------------
    //-> Get All Admins
    getAdmins(){
      console.log("get admins");
      this.httpClientService
        .getAdmins()
        .subscribe(response => {this.handleSuccessfulResponse(response);
        });
        
    }
    
    handleSuccessfulResponse(response) {
        this.admins = response;
    }
    //=================
    //->Restore Admin
      restoreAdmin(id:any){
        return this.httpClientService.restoreAdmin(id).subscribe((data:any)=>{
          if( data){
            this.toastr.success('Restore Admin!', 'Admin has been restored successfuly'); 
            this.getAdmins();
            this.mode="main";
            this.document.location.reload();
          }
          else{
            this.toastr.error('Admin restore!', 'Try Again '); 
          }
        })
              }
    //================
    //-> Delete Admin
    delAdmin(id: any) {
      if(confirm("Are you sure ?")){
        return this.httpClientService.deleteAdmin(id).subscribe(data => {
          if(data){
            this.toastr.success('Delete Admin!', 'Admin has been deleted successfuly'); 
            this.getAdmins();
            this.document.location.reload();
          }
          else{
            this.toastr.error('Delete Admin!', 'Try Again '); 
          }
        })
      }
       return true;
    }
    //================
    //----------------------------------------------------------------------------
    
    //----------------------------- Products ---------------------------------------
     //-> Get All Products

     getProducts() {
      this.httpClientService.getProducts().subscribe(
        response => this.handleSuccessfulResponseProduct(response)
      );
    }
  
  
    handleSuccessfulResponseProduct(response) {
      this.products = new Array<Product>();
      this.products1 = response;
      for (const product of this.products1) {
        const product2 = new Product();
        product2.id = product.id;
        product2.name = product.name;
        product2.retrievedImage = 'data:image/jpeg;base64,' + product.picByte;
        product2.category = product.category;
        product2.price = product.price;
        product2.quantity = product.quantity;
        product2.weight = product.weight;
        product2.description = product.description;
        product2.picByte = product.picByte;
        this.products.push(product2);
      }

      console.log("Products1 :=> ",this.products1);
      console.log("Products :=> ",this.products);
      
      
    }
    //=================
    //->Restore Product
      restoreProduct(id:any){
        return this.httpClientService.restoreProduct(id).subscribe((data:any)=>{
          if( data){
            this.toastr.success('Restore Product!', 'Product has been restored successfuly'); 
          // this.getProducts();
          this.mode="main";
          this.document.location.reload();
          }
          else{
            this.toastr.error('Restore Product!', 'Try Again '); 
          }
        })
              }
    //================
    //-> Delete Product
    delProduct(id: any) {
      if(confirm("Are you sure ?")){
        return this.httpClientService.deleteProduct(id).subscribe(data => {
          if(data){
            this.toastr.success('Delete Product!', 'Product has been deleted successfuly'); 
            // this.getProducts();
            this.document.location.reload();
          }
          else{
            this.toastr.error('Delete Product!', 'Try Again '); 
          }
        })
      }
       return true;
    }
    //================
    //----------------------------------------------------------------------------
    
    //----------------------------- Categories ---------------------------------------
     //-> Get All Categories
     getCategories(){
        this.httpClientService.getCategorys().subscribe(
          response => this.handleSuccessfulResponseCategory(response),
        );
      }
    
      handleSuccessfulResponseCategory(response) {
        this.categories = response;
      }
    //=================
    //->Restore Category
      restoreCategory(id:any){
        return this.httpClientService.restoreCategory(id).subscribe((data:any)=>{
          // this.getCategories();
          this.mode="main";
          this.document.location.reload();
          if( data){
            this.toastr.success('Restore Category!', 'Category has been restored successfuly'); 
          // this.getCategories();
          this.mode="main";
          this.document.location.reload();
          }
          else{
            this.toastr.error('Restore Category!', 'Try Again '); 
          }
        })
              }
    //================
    //-> Delete Category
    delCategory(id: any) {
      if(confirm("Are you sure ?")){
        return this.httpClientService.deleteCategory(id).subscribe(data => {
          if(data){
            this.toastr.success('Delete Category!', 'Category has been deleted successfuly');
            // this.getCategories();
            this.document.location.reload();
          }
          else{
            this.toastr.error('Delete Category!', 'Try Again '); 
          }
        })
      }
       return true;
    }
    //================
    //----------------------------------------------------------------------------
}