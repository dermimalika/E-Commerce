import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';

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

  constructor(private httpClientService: HttpClientService, private router: Router
  ) { }

  ngOnInit() {
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