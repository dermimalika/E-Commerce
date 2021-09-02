import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.css']
})
export class FilteringComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private route:Router) { }

  ngOnInit(): void {
  }

  
 

  profile(){
    
  }

  logout(){ 
    this.auth.logOut();
    this.route.navigate(['login']);
  }

}
