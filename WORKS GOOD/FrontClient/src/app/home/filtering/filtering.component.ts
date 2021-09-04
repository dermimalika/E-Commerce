import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {
  products:any=[]

  // currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 6;
  category ='';
  filter="";
  pageSizes = [3, 6, 9];

  //To check if is the filter for category or random
  s=""

  ////////////////////////////////////////////////////////////////////////////////////
  ////  Link to Assets to get images 
  ////  We must Change Localhost:4200 by Domaine Name
  urlImagP='http://localhost:4200/assets/product-photos/'
  /////////////////////////////////////////////////////////////////////////////////////  

  constructor(
    private produitService: ProduitService,
    private auth: AuthenticationService,
    private route:Router,
    private activeRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    
    //Get Param from intern url 
    this.s = this.activeRoute.snapshot.paramMap.get('category') || '';
    //To check if is the filter for category or random
    if (this.s.indexOf("fil/") !== -1) {
      this.filter=this.s.split("/ ")[1];
      console.log("filter key word :",this.filter);
      
      this.retrieveProductsFilter(); 
    }
    if (this.s.indexOf("fil/") === -1) {
      this.category=this.s;
      this.retrieveProductsCategory(); 
    }

  }

  //======================== Products

  // With Pagination Filter With Category
  getRequestParams(searchTitle: string, page: number, pageSize: number,category:string): any {
    // tslint:disable-next-line:prefer-const
    let params = {
      title:"",
      page:0,
      category:"",
      size:0
    };

    if (searchTitle) {
      params.title = searchTitle;
    }
    if (category) {
      params.category = category;
    }

    if (page) {
      params.page = page - 1;
    }

    if (pageSize) {
      params.size = pageSize;
    }

    return params;
  }
  retrieveProductsCategory(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize,this.category);

    this.produitService.getAllProductCategory(params)
    .subscribe(
      response => {
        this.products = response.ProductsFilterCategory;
        this.count = response.totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveProductsCategory();
  }

  //===========> Filter with Key word
  // With Pagination Filter With Category
  getRequestParamsfilter(searchTitle: string, page: number, pageSize: number,filter:string): any {
    // tslint:disable-next-line:prefer-const
    let params = {
      title:"",
      page:0,
      filter:"",
      size:0
    };

    if (searchTitle) {
      params.title = searchTitle;
    }
    if (filter) {
      params.filter = filter;
    }

    if (page) {
      params.page = page - 1;
    }

    if (pageSize) {
      params.size = pageSize;
    }

    return params;
  }
  retrieveProductsFilter(): void {
    const params = this.getRequestParamsfilter(this.title, this.page, this.pageSize,this.filter);

    this.produitService.getAllProductFilter(params)
    .subscribe(
      response => {
        this.products = response.ProductsFilterKeyWord;
        this.count = response.totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChangeFilter(event: number): void {
    this.page = event;
    this.retrieveProductsFilter();
  }
 //====================================================================================================

  profile(){
    
  }

  logout(){ 
    this.auth.logOut();
    this.route.navigate(['login']);
  }

}
