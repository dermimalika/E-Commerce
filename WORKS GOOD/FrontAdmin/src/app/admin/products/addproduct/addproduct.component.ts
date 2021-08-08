import { Product } from '../../../model/Product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImageUploadService } from 'src/app/service/image-upload.service';


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

  //Var for Upload Images
  selectedFiles?: FileList;
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

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };



  }
  //===========> Functs for Upload Images
  //https://www.bezkoder.com/angular-12-spring-boot-file-upload/
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }  

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.uploadService.upload(this.currentFile).subscribe(
          (event: any) => {
            //progressing bar
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });

      }

      this.selectedFiles = undefined;
    }
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

  saveProduct() {
    if (this.product.id == null) {

      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;

      this.httpClient.post('http://localhost:8080/products/upload', uploadData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.httpClientService.addProduct(this.product).subscribe(
              (product) => {
                this.bookAddedEvent.emit();
                this.router.navigate(['admin', 'products']);
              }
            );
            console.log('Image uploaded successfully');
          } else {
            console.log('Image not uploaded successfully');
          }
        }
        );
    } else {
      this.httpClientService.updateProduct(this.product).subscribe(
        (product) => {
          this.bookAddedEvent.emit();
          this.router.navigate(['admin', 'products']);
        }
      );
    }

  }

}