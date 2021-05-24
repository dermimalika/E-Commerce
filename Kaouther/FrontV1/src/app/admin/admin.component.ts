import { Component, Inject, OnInit } from "@angular/core";
import { HttpClientService } from "../service/httpclient.service";
import  {Admin} from "../Admin";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  admins: Admin[];
  displayedColumns: string[] = ["name", "phone", "delete"];

  constructor(private httpClientService: HttpClientService,  @Inject (DOCUMENT) private document:Document) {}

  ngOnInit() {
    this.getAdmins()
  }
 
  getAdmins(){
    console.log("get admins");
    
    this.httpClientService
      .getAdmins()
      .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {
    this.admins = response;
  }

  deleteAdmin(id: any) {
    if(confirm("Are you sure ?")){
      return this.httpClientService.deleteAdmin(id).subscribe(data => {
        if(data){
          console.log("delete fct : ");
          this.getAdmins();
          this.document.location.reload();
          
        }
      })
    }
     return true;
    
  }
}

