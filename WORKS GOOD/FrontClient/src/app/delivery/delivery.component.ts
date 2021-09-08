import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  constructor(private auth: AuthenticationService,private route:Router) { }

  ngOnInit(): void {
  }


  
  logout(){ 
    this.auth.logOut();
    this.route.navigate(['login']);
  }
}
