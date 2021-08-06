import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  mode:string='Login'
  //------- login Var
  username = ''
  password = ''
  invalidLogin = false

  //------- Register Var
   email=""
   passw=""
   firstName=""
   lastName=""
   phone=""
   usename=""

  mail:string = '' //Pour Forgot PSW

  psw = '' // Pour New PSW

  @Input() error: string | null="";
  constructor(private router: Router,
    private auth: AuthenticationService,) { 
      this.mode="login"
    }

  ngOnInit(): void {
  }

  checkLogin() {
    (this.auth.authenticate(this.username, this.password).subscribe(
      (data:any) => {
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

  Register(){
    var client={
      usename:this.usename,
      firstName:this.firstName,
      lastName:this.lastName,
      phone:this.phone,
      email:this.email,
      password:this.passw,
    }
    this.auth.register(client).subscribe((data: any)=>{
      if(data){
        this.auth.sendMail(this.email,"register");
        this.mode='login';
      }
    });
  }

  forgotPsw(){
    this.auth.forgotpsw({email:this.mail,password:"aaa"}).subscribe((data: any)=>{
      if(data){
        console.log("Data From forgot PSW :",data);
//        window.location.reload();
        this.mode='reset';
      }
    });
  }

  resetPsw(){
    this.auth.resetpsw({password:this.psw,email:this.mail}).subscribe((data: any)=>{
      if(data){
        this.auth.sendMail(this.mail,"reset");
        this.mode='login';
      }
    });
  }
}
