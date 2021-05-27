import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  super: any;

  constructor(private loginService:AuthenticationService,    
    private authService:AuthenticationService,
    ){ }
  ngOnInit() {
    this.super=this.authService.isRoleSuper();


  }

  isLoggedIn(){
 if( this.loginService.isUserLoggedIn()){return true};
 return false;
  }

}
