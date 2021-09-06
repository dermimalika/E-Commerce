import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CommandeService } from '../services/commande.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  products:any
  totalCost:any

  ////////////////////////////////////////////////////////////////////////////////////
  ////  Link to Assets to get images 
  ////  We must Change Localhost:4200 by Domaine Name
  urlImagP='http://localhost:4200/assets/product-photos/'
  /////////////////////////////////////////////////////////////////////////////////////  

  constructor(private auth: AuthenticationService,
    private commandeService:CommandeService,
    private route:Router,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.getPanierItems();

    
  }

  getPanierItems(){
    this.commandeService.getPanier().subscribe(
      (data: any)=>{

       this.products=data.paniertItems;
       console.log("panier Item :",this.products);
       
       this.totalCost=data.totalCost;
       
    })
  }

  deleteProdPanier(id:any){
    this.commandeService.deletePanier(id).subscribe((data:any)=>{
      if( data){
        this.document.location.reload();
      }

    })
  }

  addOrder(){
    this.commandeService.addOrder().subscribe((data:any)=>{
       this.route.navigate(['/'])
      
    })
  }

  logout(){ 
    this.auth.logOut();
    this.route.navigate(['login']);
  }

}
