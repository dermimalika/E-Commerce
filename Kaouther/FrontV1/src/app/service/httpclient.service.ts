import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export class Admin {
  constructor(
    public id: string,
    public name: string,
    public phone: string,
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getAdmins() {
    console.log("Admin service get Admins");
    return this.httpClient.get("http://localhost:8080/admins/all");
  }

  public deleteAdmin(id: number) :Observable<any>{
    return this.httpClient.delete(
      "http://localhost:8080/admins/delAdmin" + "/" +id
    );
  }

  public createAdmin(user : Object): Observable<Object> {
    return this.httpClient.post(
      "http://localhost:8080/register",
      user
    );
  }
}
