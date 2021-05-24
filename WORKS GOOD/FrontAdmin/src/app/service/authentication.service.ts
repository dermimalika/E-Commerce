import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

export class Admin {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
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
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  isRoleSuper(){
    let role = sessionStorage.getItem("role");
    if (role == 'SUPER') return true;
  }

  

  logOut() {
    sessionStorage.removeItem("username");
  }
}