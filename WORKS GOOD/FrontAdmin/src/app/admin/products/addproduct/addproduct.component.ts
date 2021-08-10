import { Product } from '../../../model/Product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { environment } from 'src/environments/environment';


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
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.getCategory();
    this.fileInfos = this.uploadService.getFiles();
  }

  // public onFileChanged(event) {
  //   console.log(event);
  //   this.selectedFiles = event.target.files[0];

  //   // Below part is used to display the selected image
  //   let reader = new FileReader();
  //   reader.readAsDataURL(event.target.files[0]);
  //   reader.onload = (event2) => {
  //     this.imgURL = reader.result;
  //   };



  // }
  //===========> Functs for Upload Images
  //https://www.bezkoder.com/angular-12-spring-boot-file-upload/
  selectFile(event: any): void {
    this.selectedFiles = event.target.files[0];
    console.log("selectedFiles :",this.selectedFiles);
    
  }  

  // upload(): void {
  //   this.progress = 0;

  //   if (this.selectedFiles) {
  //     const file: File | null = this.selectedFiles;

  //     if (file) {
  //       this.currentFile = file;

  //       // this.uploadService.upload(this.currentFile).subscribe(
  //       //   (event: any) => {
  //       //     //progressing bar
  //       //     if (event.type === HttpEventType.UploadProgress) {
  //       //       this.progress = Math.round(100 * event.loaded / event.total);
  //       //     } else if (event instanceof HttpResponse) {

  //       //       this.fileInfos = this.uploadService.getFiles();
  //       //     }
  //       //   },
  //       //   (err: any) => {
  //       //     console.log(err);
  //       //     this.progress = 0;

  //       //     if (err.error ) {
  //       //       this.message = 'Could not upload the file!';
  //       //     }

  //       //     this.currentFile = undefined;
  //       //   });

  //     }

  //     // this.selectedFiles = undefined;
  //   }
  // }
  //===========> Get Categories
  getCategory() {
    this.httpClientService.getCategorys().subscribe((data: any)=>{
      this.categories=data;
      console.log("in constructor in content-list :",this.categories);
      console.log("categories in add product ",this.categories[0].name);
    });
  }
  //============================

  saveProduct() {
    if (this.product.id == null) {
      console.log("in begin of save Product ");
      
      // const uploadData = new FormData();
      // console.log("selected File : ",this.selectedFiles);
      // console.log("selected File Name: ",this.selectedFiles.name);
      
      // uploadData.append('file', this.selectedFiles, this.selectedFiles.name);
      this.uploadService.upload(this.selectedFiles).subscribe(
        (response) => {
            if (response) {
              
              console.log('Image uploaded successfully');
              this.router.navigate(['admin', 'products']);
            } else {
              console.log('Image not uploaded successfully');
            }
            } 
          );
          console.log("after upload image of save Product ");
      this.httpClient.post(this.urlBack+'products/add',this.product).subscribe() 
      window.location.reload;

    }
    // } else {
    //   this.httpClientService.updateProduct(this.product).subscribe(
    //     (product) => {
    //       this.bookAddedEvent.emit();
    //       this.router.navigate(['admin', 'products']);
    //     }
    //   );
    // }

  }

}