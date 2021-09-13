import { Product } from '../../../model/Product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  @Input()
  product: Product;

  @Output()
  bookAddedEvent = new EventEmitter();

  public selectedFile;
  imgURL: any;
  categories:any=[];
    // This URL :=> http://localhost:8080/
    urlBack:String=environment.urlBack;
  

  //Var for Upload Images
  selectedFiles?: File;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private httpClientService: HttpClientService,
    private uploadService: ImageUploadService,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.getCategory();
    this.fileInfos = this.uploadService.getFiles();
  }

  //===========> Functs for Upload Images
  // function to generate random name for image
   makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }

  //https://www.bezkoder.com/angular-12-spring-boot-file-upload/
  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    console.log("selectedFiles :",this.selectedFiles);
    
  }  

  //===========> Get Categories
  getCategory() {
    this.httpClientService.getCategorys().subscribe((data: any)=>{
      this.categories=data;
      console.log("in constructor in content-list :",this.categories);
      console.log("categories in add product ",this.categories[0].name);
    });
  }
  //============================

  //========================================
  saveProduct() {
  //Possible values for a name
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  //Generate Random name to Image
  let nameImage=this.makeRandom(4, possible)+this.selectedFiles.name;

    let cond=false;
    if (this.product.id == null) {
      console.log("in begin of save Product ");
      
      this.uploadService.upload(this.selectedFiles,nameImage).subscribe(
        (response) => {
            if (response) {
              console.log("response of upload image :",response);

              console.log('Image uploaded successfully');
               
              cond=true;
            } else {
              console.log('Image not uploaded successfully');
            }
            } 
          );
          
      if(cond){
        this.product.fileUrl=nameImage;
        this.httpClient.post(this.urlBack+'products/add',this.product).subscribe(
          (data:any) => {
            if( data){
              this.toastr.success('Add Product!', 'Product has been added successfuly'); 
              this.router.navigate(['admin', 'products']);
            }
            else{
              this.toastr.error('Add Product!', 'Try Again '); 
            }
        }) ;

        
      }
    }
  }

}