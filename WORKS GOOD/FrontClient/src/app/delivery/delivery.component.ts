import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../services/commande.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  
  //ID ORDER
  id:any;

  constructor(private auth: AuthenticationService,private route:Router,
    private commandeService:CommandeService,
    private toastr: ToastrService,
    private router: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('idOrder');
  }

  skipDelivery(){
    this.toastr.success('Purchase Done !', 'Thank you for your trust');
    this.route.navigate(['/']);
    
  }
  deliveryOrder(){

    this.commandeService.deliveryOrder(this.id).subscribe((res:any)=>{
      if(res){
        this.toastr.success('Purchase Done !', 'Thank you for your trust');
        this.route.navigate(['/']);
      }
      else{
        this.toastr.error('Purchase Error !', 'Try Again');
      }

      
    })
  }


  
  logout(){ 
    this.auth.logOut();
    this.toastr.success('Logout Sucess !', 'Come back Soon !');
    this.route.navigate(['login']);
  }
}
