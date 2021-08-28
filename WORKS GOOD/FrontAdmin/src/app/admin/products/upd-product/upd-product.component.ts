import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { ImageUploadService } from 'src/app/service/image-upload.service';

@Component({
  selector: 'app-upd-product',
  templateUrl: './upd-product.component.html',
  styleUrls: ['./upd-product.component.css']
})
export class UpdProductComponent implements OnInit {

  @Input()
  product: Product;
  id:any;
  products: Array<Product>;
  categories:any=[];
  message = '';
  super: any;
  //Var for Upload Images
  selectedFiles?: File;
  selected:any;
  
  constructor(    
    private httpClientService: HttpClientService,
    private router: Router,
    private uploadService: ImageUploadService,
    private authService:AuthenticationService,
    private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.selected=false;
    this.refreshData();
    this.getCategory();
    this.super=this.authService.isRoleSuper();
  }

    //===========> Get Categories
    getCategory() {
      this.httpClientService.getCategorys().subscribe((data: any)=>{
        this.categories=data;
        console.log("in constructor in content-list :",this.categories);
        console.log("categories in upd product ",this.categories[0].name);
      });
    }
    //============================

  
  refreshData() {
    
    this.httpClientService.getProducts().subscribe(
      response => {
        this.id = this.activedRoute.snapshot.paramMap.get('id');
        console.log("id from params upd :",this.id);
        console.log("products from the back :",response);
        this.product = response.find(p => {
          return p.id === +this.id;
        });
        console.log("selectedProduct updProduct :",this.product);
      }
    );

  }
    // function to generate random name for image
    makeRandom(lengthOfCode: number, possible: string) {
      let text = "";
      for (let i = 0; i < lengthOfCode; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
        return text;
    }
    
  //Get Value From Form Of Image
  //https://www.bezkoder.com/angular-12-spring-boot-file-upload/
  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    this.selected=true;
    console.log("selectedFiles :",this.selectedFiles);   
  }  

  editProduct() {
  
  //Possible values for a name
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let nameImage=""

    if (this.product.id) {
      //If Admin Change the Picture
      if(this.selected){
          //Generate Random name to Image
          nameImage=this.makeRandom(4, possible)+this.selectedFiles.name;
        //Upload Image
        this.uploadService.upload(this.selectedFiles,nameImage).subscribe(
         (response) => {
             if (response) {
               console.log('Image uploaded successfully');

              } else {
               console.log('Image not uploaded successfully');
              }
            } 
          );
      }


    //Init Variable fileURl with value 
    if(nameImage!==""){
      this.product.fileUrl=nameImage;
    }     

    //Send Product to Back
    this.httpClientService.updateProduct(this.product.id,this.product).subscribe(
      (product)=>{

        this.router.navigate(['admin','products'])
      }
    )
  }
  }


}
