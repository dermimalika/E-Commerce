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

  constructor(private toastr: ToastrService,
    private produitService: ProduitService,
    private profileService: ProfileService,
    private auth: AuthenticationService,
    private route:Router) { }

  ngOnInit(): void {
    this.toastr.success('Hello !', 'Welcome again!');
    this.getProducts();  
  }


  getProducts(){
    this.produitService.getProducts().subscribe((data: any)=>{
      this.products=data;
      console.log("Products :\n",this.products);
    });
  }

  profile(){
    
  }

  logout(){ 
    this.auth.logOut();
    this.route.navigate(['login']);
  }


}
