import { Component, Inject, OnInit } from "@angular/core";
import { HttpClientService } from "../service/httpclient.service";
import { AuthenticationService } from "../service/authentication.service";
import { Admin } from "../Admin";
import { DOCUMENT } from "@angular/common";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  admins: Admin[];
  super: any;
  displayedColumns: string[] = ["name", "phone", "username", "delete", "update"];
  mode = 'list';
  name: String = "";   //  | Form Attribute
  phone: String = "";   //  | Form Attribute
  username: String = "";   //  | Form Attribute

  idUpd = 0;

  constructor(
    private httpClientService: HttpClientService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.getAdmins();
    this.super = this.authService.isRoleSuper();
  }

  getAdmins() {
    console.log("get admins");

    this.httpClientService
      .getAdmins()
      .subscribe(response => {
        this.handleSuccessfulResponse(response);
        console.log('subscribe reponse', response);
      });
  }

  handleSuccessfulResponse(response) {
    this.admins = response;
    console.log('handleSuccess reponse', this.admins);
  }

  archAdmin(id: any) {
    if (confirm("Are you sure ?")) {
      return this.httpClientService.archAdmin(id).subscribe(data => {
        if (data) {
          console.log("Archiver fct : ");
          this.toastr.success('Delete Admin!', 'Admin has been moved to recycle bin'); 
          this.getAdmins();
          this.document.location.reload();
        }
        else{
          this.toastr.error('Delete Admin!', 'Try Again '); 
        }
      })
    }
    return true;
  }




  loadUpd(id: number, name: string, phone: string, username: string) {
    this.idUpd = id;
    this.name = name;
    this.phone = phone;
    this.username = username;
  }
  updAdmin() {
    this.httpClientService.updateAdmin(this.idUpd, { name: this.name, phone: this.phone, username: this.username })
      .subscribe((data: any) => {
        if (data) {
          this.toastr.success('Admin Update','Admin has been updated',{ timeOut: 5000})
          this.getAdmins();
          console.log("Update store ");

          this.getAdmins();
          this.mode = "list";
          this.document.location.reload();

        } else {
           this.toastr.error(data['msg'],'Error',{ timeOut: 3000})   
          console.log("there is an error in updating ");

        }
      });

  }
}