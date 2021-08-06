import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProduitService } from 'src/app/services/produit.service';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  id:any
  produit:any=[]


  constructor(private route:ActivatedRoute,
    private produitService: ProduitService ,
    private auth: AuthenticationService,) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduit();
  }

  getProduit(){
    this.produitService.getProduit(this.id).subscribe((data: any)=>{
      this.produit=data;
      console.log("produit :\n",this.produit);
    });
  }

}
