import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { environment } from 'src/environments/environment';

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

  constructor(private httpClientService: HttpClientService, private router: Router
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
        this.bookDeletedEvent.emit();
        this.router.navigate(['admin', 'products']);
      }
    );
  }

  editProduct() {
    this.router.navigate(['admin', 'products'], { queryParams: { action: 'edit', id: this.product.id } });
  }

}