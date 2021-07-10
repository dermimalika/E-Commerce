import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mode:string='Login'
  username = ''
  password = ''
  invalidLogin = false

  mail:string = '' //Pour Forgot PSW

  psw = '' // Pour New PSW
  
  @Input() error: string | null;

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    ) {
      this.mode="login"
     }

  ngOnInit() {
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      (data:any) => {
        this.loginservice.isSuper();
        this.router.navigate(['']);
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.error = error.message;

      }
    )
    );
  }

  forgotPsw(){
    this.loginservice.forgotpsw(this.mail).subscribe((data: any)=>{
      if(data){
        console.log("Data From forgot PSW :",data);
        
//        window.location.reload();
        this.mode='reset';
      }
    });
  }

  resetPsw(){
    this.loginservice.resetpsw(this.password,this.mail).subscribe((data: any)=>{
      if(data){
        this.loginservice.sendMail(this.mail);
        this.mode='login';
      }
    });
  }

}