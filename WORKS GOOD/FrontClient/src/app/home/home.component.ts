import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { ProduitService } from '../services/produit.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any=[]

  // currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 12;
  pageSizes = [3, 6, 9];


  urlImagP='../../../assets/images/products/'
  constructor(private toastr: ToastrService,
    private produitService: ProduitService,
    private profileService: ProfileService,
    private auth: AuthenticationService,
    private route:Router) { }

  ngOnInit(): void {
    this.toastr.success('Hello !', 'Welcome again!');
    //this.getProducts(); 
    this.retrieveProducts(); 
  }


//======================== Products
  //Without Pagination
  // getProduit(){
  //   this.produitService.getProduit(this.id).subscribe((data: any)=>{
  //     this.produit=data;
  //     console.log("produit :\n",this.produit);
  //   });
  // }

  // With Pagination
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params = {
      title:"",
      page:0,
      size:0
    };

    if (searchTitle) {
      params.title = searchTitle;
    }

    if (page) {
      params.page = page - 1;
    }

    if (pageSize) {
      params.size = pageSize;
    }

    return params;
  }
  retrieveProducts(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.produitService.getAllProducts(params)
    .subscribe(
      response => {
        this.products = response;
        this.count = response.length;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProducts();
  }
//====================================================================================================

  profile(){
    
  }

  logout(){ 
    this.auth.logOut();
    this.route.navigate(['login']);
  }


}
