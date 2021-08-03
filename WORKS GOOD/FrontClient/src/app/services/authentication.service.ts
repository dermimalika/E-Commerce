import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  urlBack:String=environment.urlBack;

  super:any=""
  constructor(private httpClient: HttpClient) { }
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
authenticate(clientname:any, psw:any) :Observable<any> {
  return this.httpClient
    .post<any>("/auth/login", { email:clientname, password:psw } )
    //.post<any>(this.urlBack+"auth/login", { clientname, password },HTTP_OPTIONS)
    .pipe(
      map(clientData => {
        let s = clientData.accessToken
        
        sessionStorage.setItem("clientname", clientname);
        let tokenStr = "Bearer " + s;
        sessionStorage.setItem("clienttoken", tokenStr);
        return clientData;
      })
    );
}

register(client: any): Observable<any> {
  var clients={
    username:client.username,
    firstName:client.firstName,
    lastName:client.lastName,
    phone:client.phone,
    email:client.email,
  }
  //return this.httpClient.post<any>(this.urlBack+"auth/register",client,HTTP_OPTIONS)
  return this.httpClient.post<any>("auth/register",client)
  .pipe(
    map(clientData => {
      let s = clientData.accessToken
      
      sessionStorage.setItem("clientname",clients.username);
      let tokenStr = "Bearer " + s;
      sessionStorage.setItem("clienttoken", tokenStr);
      return clientData;
    })
  );
}

forgotpsw(data:any): Observable<any>  {
  //return this.httpClient.post(this.urlBack+"admins/forgotpsw",data);
  return this.httpClient
  .post<any>("auth/forgotpsw", data)
  .pipe(
    map(clientData => {
      
      console.log("service clientdata :",clientData);

      return clientData;
    })
  );
}

resetpsw(data:any){
 return this.httpClient.post("auth/resetpsw",data);
}

logOut() {
  sessionStorage.removeItem("clientname");
}

//Send Confirmation Mail
sendMail(mail:string,mode:any){
  this.httpClient.post("auth/sendMailClient",{email:mail,password:mode}).subscribe();
}

//Check if CLient Login
isClientLoggedIn() {
  let client = sessionStorage.getItem("clientname");
  console.log(!(client === null));
  return !(client === null);
}

}
