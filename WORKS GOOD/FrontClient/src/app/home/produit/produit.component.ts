
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommandeService } from 'src/app/services/commande.service';
import { ProduitService } from 'src/app/services/produit.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthGuardGuard } from 'src/app/services/auth-guard.guard';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  id:any
  produit:any=[]
  comments:any=[]
  client:any;

  //Comments Pagination Var
  currentComments: any = {};
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  quantity="1"

  urlImag='../../../assets/images/avatars/'

  ////////////////////////////////////////////////////////////////////////////////////
  ////  Link to Assets to get images 
  ////  We must Change Localhost:4200 by Domaine Name
  urlImagP='http://localhost:4200/assets/product-photos/'
  /////////////////////////////////////////////////////////////////////////////////////  


  //Add form Comments var
  subject:any;
  message:any;


  constructor(private route: ActivatedRoute,
    private produitService: ProduitService,
    private profileService: ProfileService ,
    private commandeService:CommandeService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthenticationService,
    @Inject(DOCUMENT) private document: Document) {

  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduit();
    this.retrieveComments();

  }

  //======================================= Comments
  afficher(){
    console.log("comments after retrieve comments :\n",this.comments);
  }
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
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

  retrieveComments(): void {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);

    this.produitService.getAll(this.id,params)
    .subscribe(
      (response:any) => {
        // console.log("response in comments retrieve fct :",response);

        this.comments = response;
        this.count = response.totalItems;
        console.log("comments.length :", Object.keys(this.comments.Comments).length);

        for (let i = 0; i < Object.keys(this.comments.Comments).length ; i++) {
          const element = this.comments[i];

          this.profileService.getProfile(this.comments.Comments[i].idClient).subscribe((data:any)=> {

              this.comments.Comments[i].avatarClient=data.avatar;
              this.comments.Comments[i].nomClient=data.firstName;
              this.comments.Comments[i].emailClient=data.email;


          })
        }
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveComments();
  }

  // getComments(){
  //   this.produitService.getComments(this.id).subscribe((data: any)=>{
  //     this.comments=data;
  //     console.log("comments :\n",this.comments);
  //   });
  // }

  addComment(){
    let request="Subject :"+this.subject+"\n"+this.message;
    console.log("request in com");
    if (this.auth.isClientLoggedIn()){
      this.produitService.addComments(this.id,request).subscribe(data=>{
        if( data){
          this.toastr.success('Add Comment!', 'The Comment has been added successfuly'); 
          this.document.location.reload();
        }
        else{
          this.toastr.error('Add Comment!', 'Try Again '); 
        }
      });
    }
    else{
      this.toastr.error('Log In!', 'U need to Log In to continue'); 
      this.router.navigate(['login']);
    }

  }
  updComment(){

    if (this.auth.isClientLoggedIn()){
      this.produitService.updateComments(this.id,"id Comment").subscribe(data=>{
        if( data){
          this.toastr.success('Update Comment!', 'The Comment has been pdated successfuly'); 
          this.document.location.reload();
        }
        else{
          this.toastr.error('Update Comment!', 'Try Again '); 
        }
      });
    }
    else{
      this.toastr.error('Log In!', 'U need to Log In to continue'); 
      this.router.navigate(['login']);
    }
  }

  deleteComment(idComment :any){
    this.produitService.deleteComment(this.id,idComment).subscribe(data=>{
      if( data){
        this.toastr.success('Delete Comment!', 'The Comment has been deleted successfuly'); 
        this.document.location.reload();
      }
      else{
        this.toastr.error('Delete Comment!', 'Try Again '); 
      }
    });

  }
//=================================================================================================
//======================== Products
 // Without Pagination
  getProduit(){
    this.produitService.getProduit(this.id).subscribe((data: any)=>{
      this.produit=data;
      console.log("produit :\n",this.produit);
    });
  }

//====================================================================================================
//==================== Panier
  addPanier(){
    let body={
      productId:this.id,
      quantity:this.quantity
    };
    if (this.auth.isClientLoggedIn()){
      this.commandeService.addPanier(body).subscribe(
        (data:any)=>{
          if( data){
            this.toastr.success('Add Panier!', 'The Product has been added successfuly'); 
            this.router.navigate(['commande']);
          }
          else{
            this.toastr.error('Add Panier!', 'Try Again '); 
          }
          
        })
    }
    else{
      this.toastr.error('Log In!', 'U need to Log In to continue'); 
      this.router.navigate(['login']);
    }
  }
//====================================================================================================

  logout() {
    this.auth.logOut();
    this.toastr.success('Logout Sucess !', 'Come back Soon !');
    this.router.navigate(['login']);
  }

}
