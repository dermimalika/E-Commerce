import { Product } from '../../../model/Product';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/service/httpclient.service';


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

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.getCategory();
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