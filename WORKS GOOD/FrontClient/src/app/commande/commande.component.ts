import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private route:Router) { }

  ngOnInit(): void {
  }

  logout(){ 
    this.auth.logOut();
    this.route.navigate(['login']);
  }

}
