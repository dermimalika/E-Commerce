import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HeaderComponent } from '../header/header.component';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    ) {
      this.mode="login"
     }

  ngOnInit() {
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      (data:any) => {
        this.loginservice.isSuper();
        this.toastr.success('Login Check!', 'Welcome Back! '); 
        this.router.navigate(['']);
        this.invalidLogin = false
      },
      error => {
        this.toastr.error('Login Check!', 'Please Login again!'); 
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
        this.toastr.success('Forget Password!', 'Your E mail has been found '); 
//        window.location.reload();
        this.mode='reset';
      }
      else{
        this.toastr.error('Forget Password!', 'Your E mail has not been found '); 
      }
    });
  }

  resetPsw(){
    this.loginservice.resetpsw(this.password,this.mail).subscribe((data: any)=>{
      if(data){
        this.loginservice.sendMail(this.mail);
        this.toastr.success('Reset Password!', 'A un E mail has been send '); 
        this.mode='login';
      }
      else{
        this.toastr.error('Reset Password!', 'Try Again'); 
        this.mode='forgot';
      }
    });
  }

}