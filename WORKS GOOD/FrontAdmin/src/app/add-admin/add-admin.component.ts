import { Component, OnInit } from "@angular/core";
import { HttpClientService } from "../service/httpclient.service";
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import {Admin} from "../Admin";

@Component({
  selector: "app-add-admin",
  templateUrl: "./add-admin.component.html",
  styleUrls: ["./add-admin.component.css"]
})
export class AddAdminComponent implements OnInit {
  user: Admin = new Admin();
  submitted = false;
  list:any=[]

  constructor(private httpClientService: HttpClientService,
    private router: Router) {}

  ngOnInit() {}

  addAdmin(){
    console.log("Add new Admin");
    //Get List of Admins
    this.httpClientService.getAdmins().subscribe(response => {
      this.list=response;
    })    


    let isPresent = this.list.some((el:any) =>{ 
      console.log("this is el : => ",el," ",el.nom);
      return el.nom == this.user.name});
    console.log("isPresent Value :",isPresent," ",this.user.name);
    console.log("in addAdmin in admin.ts :",this.list);
    
    if(isPresent){
      console.log("this is already exisit");
    }
    else{
      //ADD
    this.httpClientService.createAdmin({name:this.user.name,password:this.user.password,phone:this.user.phone,username:this.user.username})
    .subscribe((data:any)=>{
      if(data){
          // this.toastr.success('A New Admin Added','New Admin',{ timeOut: 5000})
          this.router.navigate(['/']);
          
      }else{
        // this.toastr.error(data['msg'],'Error',{ timeOut: 3000})   
        console.log("there is an error in adding ");
      }
    });
   }
  }

  onSubmit() {
    this.submitted = true;
    this.addAdmin();    
  }

  gotoList() {
    this.router.navigate(['/admins']);
  }


}
