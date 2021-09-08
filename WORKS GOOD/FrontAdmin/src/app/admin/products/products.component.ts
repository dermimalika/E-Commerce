
import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<Product>;
  products1: Array<Product>;
  selectedProduct: Product;
  action: string;
  super: any;
  idAdmin: any;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private authService:AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.idAdmin=JSON.parse(sessionStorage.getItem('admin')).idStore;
    this.refreshData();
    this.super=this.authService.isRoleSuper();

  }
  testAdmin(id_store){
    if(id_store !=this.idAdmin){
      return true
    }
    if (id_store==this.idAdmin){
      return false
    }
  }

  refreshData() {
    this.httpClientService.getProducts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = params['action'];
        if (id) {
          this.selectedProduct = this.products.find(product => {
            return product.id === +id;
          });
          console.log("selectedProduct :",this.selectedProduct);
          
        }
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.products = new Array<Product>();
    this.products1 = response;
    console.log("products from the back :",response);
    
    for (const product of this.products1) {

      const product2 = new Product();
      product2.id = product.id;
      product2.name = product.name;
      product2.category = product.category;
      product2.price = product.price;
      product2.quantity = product.quantity;
      product2.weight = product.weight;
      product2.fileUrlImagePath=product.fileUrlImagePath;
      product2.description = product.description;
      this.products.push(product2);
    }
  }

  addProduct() {
    this.selectedProduct = new Product();
    this.router.navigate(['admin', 'products'], { queryParams: { action: 'add' } });
  }



  viewProduct(id: number) {
    this.router.navigate(['admin', 'products'], { queryParams: { id, action: 'view' } });
  }
}
