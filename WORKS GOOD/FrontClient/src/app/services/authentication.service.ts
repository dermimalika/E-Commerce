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
        let s = clientData
        return this.httpClient.post("users/login", { email:clientname, password:psw }).subscribe((data: any)=>{
          console.log("Client from users/login :",data);
          var client={
            id:data.id,
            username:data.username,
            firstName:data.firstName,
            lastName:data.lastName,
            phone:data.phone,
            email:data.email,
            avatar:data.avatar,
          }
          
          sessionStorage.setItem('client', JSON.stringify(client));
          console.log("token : ",s.accessToken);
          let tokenStr = s.accessToken;
        // sessionStorage.setItem("clienttoken","Bearer "+ tokenStr);
        sessionStorage.setItem("clienttoken",tokenStr);
          
        });
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
      return this.httpClient.post("users/login", { email:clients.email, password:"n'importe quoi" }).subscribe((data: any)=>{
        console.log("Client from users/login register :",data);
        var client={
          id:data.id,
          username:data.username,
          firstName:data.firstName,
          lastName:data.lastName,
          phone:data.phone,
          email:data.email,
        }
        
        
        sessionStorage.setItem('client', JSON.stringify(client));
        let tokenStr = s;
        // sessionStorage.setItem("clienttoken","Bearer "+ tokenStr);
        sessionStorage.setItem("clienttoken",tokenStr);
        
      });
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

clientId(){
  return 
}

logOut() {
  sessionStorage.removeItem("clienttoken");
  sessionStorage.removeItem("client");
}

//Send Confirmation Mail
sendMail(mail:string,mode:any){
  this.httpClient.post("auth/sendMailClient",{email:mail,password:mode}).subscribe();
}

//Check if CLient Login
isClientLoggedIn() {
  let client = sessionStorage.getItem("clienttoken");
  console.log(!(client === null));
  return !(client === null);
}

}
