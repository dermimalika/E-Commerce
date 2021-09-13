import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CommandeService } from '../services/commande.service';
import { DOCUMENT } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
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
        this.toastr.success('Delete Product!', 'The Product has been deleted successfuly'); 
        this.document.location.reload();
      }
      else{
        this.toastr.error('Delete Product!', 'Try Again '); 
      }

    })
  }

  addOrder(){
    this.commandeService.addOrder().subscribe((data:any)=>{
       console.log("id Order in commande :",data.id);
       this.route.navigate(['/delivery/'+data.id])
      
    })
  }

  logout(){ 
    this.auth.logOut();
    this.toastr.success('Logout Sucess !', 'Come back Soon !');
    this.route.navigate(['login']);
  }

}
