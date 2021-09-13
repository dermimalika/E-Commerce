import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { environment } from 'src/environments/environment';
import { ImageUploadService } from 'src/app/service/image-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {

  @Input()
  product: Product;
  @Output()
  bookDeletedEvent = new EventEmitter();
  // This URL :=> http://localhost:8080/
  urlBack:String="/assets";
  path="";
  mode='view';
    //Var for Upload Images
    selectedFiles?: File;

  constructor(
    private httpClientService: HttpClientService,
    private toastr: ToastrService,
    private router: Router,
    private uploadService: ImageUploadService,
  ) {}

  ngOnInit() {
    console.log("products in view :",this.product);

  }
  imagepath(){
    this.path="/assets"+decodeURIComponent(this.product.fileUrlImagePath)
  }
  deleteProduct() {
    this.httpClientService.archProduit(this.product.id).subscribe(
      (product) => {

        if( product){
          this.toastr.success('Delete Product!', 'Product has been deleted successfuly'); 
          this.bookDeletedEvent.emit();
          this.router.navigate(['admin', 'products']);
        }
        else{
          this.toastr.error('Delete Product!', 'Try Again '); 
        }
      }
    );
  }
  editProduct(){
    this.router.navigate(['updproduct/'+this.product.id])
  }
  
}