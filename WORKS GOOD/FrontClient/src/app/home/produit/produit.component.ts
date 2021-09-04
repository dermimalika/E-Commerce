
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProduitService } from 'src/app/services/produit.service';
import { ProfileService } from 'src/app/services/profile.service';


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
    private auth: AuthenticationService,) {

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

    this.produitService.addComments(this.id,request).subscribe(data=>{
      window.location.reload;
    });

  }
  updComment(){
    this.produitService.updateComments(this.id,"id Comment");
    window.location.reload;
  }

  deleteComment(idComment :any){
    this.produitService.deleteComment(this.id,idComment).subscribe(data=>{
      window.location.reload;
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
  profile() {

  }

  logout() {
    this.auth.logOut();
    
  }

}
