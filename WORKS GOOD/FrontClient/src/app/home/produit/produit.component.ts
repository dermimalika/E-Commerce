
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
  comments:any=[]



  constructor(private route:ActivatedRoute,
    private produitService: ProduitService ,
    private auth: AuthenticationService,) { 
      
    }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduit();
    this.getComments();
  }

  getProduit(){
    this.produitService.getProduit(this.id).subscribe((data: any)=>{
      this.produit=data;
      console.log("produit :\n",this.produit);
    });
  }

  getComments(){
    this.produitService.getComments(this.id).subscribe((data: any)=>{
      this.comments=data;
      console.log("comments :\n",this.comments);
    });
  }

  //Need Attributs of form 
  addComment(){
    this.produitService.addComments(this.id);
    window.location.reload;
  }

  //Need Attributs of form
  //Need Id of comment
  updComment(){
    this.produitService.updateComments(this.id,"id Comment");
    window.location.reload;
  }

  //Need Id of Comment
  deleteComment(){
    this.produitService.deleteComment(this.id,"idComment");
    window.location.reload;
  }

}
