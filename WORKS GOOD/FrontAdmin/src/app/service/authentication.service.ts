import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

export class Admin {
  constructor(public status: string) {}
}




@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

  urlBack:String=environment.urlBack;

  super:any=""
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(username, password) {
    return this.httpClient
      .post<any>("http://localhost:8080/authenticate", { username, password })
      .pipe(
        map(userData => {
          let s = userData.token.split(" ismail ")
          console.log('Token without /'+s[0]);
          console.log('Role without /'+s[1]);
          
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + s[0];
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("role", s[1]);
          this.super=sessionStorage.getItem("role");
          return userData;
        })
      );
  }
  setSessionsvars(username){
    const headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

    return this.httpClient.get(this.urlBack+'admins/username?mail='+username,{headers}).subscribe((user:any)=> {
      console.log("service authentication get user details :",user);
      let admin={
        id:user.id,
        idStore:user.store.idStore,
        name:user.name,
        email:user.username
      }
      sessionStorage.setItem("admin",JSON.stringify(admin))
    })
    
  }

  forgotpsw(data:any): Observable<any>  {
    //return this.httpClient.post(this.urlBack+"admins/forgotpsw",data);
    return this.httpClient
    .post<any>(this.urlBack+"admins/forgotpsw", data)
    .pipe(
      map(userData => {
        
        console.log("service userdata :",userData);

        return userData;
      })
    );
  }

  resetpsw(psw:any,rmail:any){
   return this.httpClient.post(this.urlBack+"admins/resetpsw",{password:psw,mail:rmail});
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    return !(user === null);
  }

  isRoleSuper(){
    let role = sessionStorage.getItem("role");
    if (role == 'SUPER') return true;
  }

  isSuper(){
    this.super = sessionStorage.getItem("role");
  }

  

  logOut() {
    sessionStorage.removeItem("username");
  }

  sendMail(mail:string){
    this.httpClient.post("http://localhost:8080/sendMailAdmin",mail).subscribe();
  }
}