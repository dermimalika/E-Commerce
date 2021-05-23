import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  name:String=""    //  | Form Attribute

  idUpd=0  // | For Update Mecanisme

  list: any=[];
  mode ='list';

  constructor(
    private storeService: StoreService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.getStores();
  }

  // -----------------------------------------
  // -------- > Fonctions < ------------------
  //-> Get All Stores
  getStores(){
    this.storeService.getAll().subscribe((data: any)=>{
      this.list=data;
      console.log("in constructor in store :",this.list);
    });
  }
  //================
  //-> Create New Store
  addStore(){
    console.log("create new Store");

    let isPresent = this.list.some((el:any) =>{ 
      console.log("this is el : => ",el," ",el.nom);
      return el.nom == this.name});
    console.log("isPresent Value :",isPresent," ",this.name);
    console.log("in addStore in store.ts :",this.list);
    
    if(isPresent){
      console.log("this is already exisit");
    }
    else{
    this.storeService.create({name:this.name})
    .subscribe((data:any)=>{
      if(data){
          // this.toastr.success('A New Admin Added','New Admin',{ timeOut: 5000})
          this.getStores();
          console.log("new store ");
          
          this.getStores();
          this.mode="list";
          this.document.location.reload();
          
      }else{
        // this.toastr.error(data['msg'],'Error',{ timeOut: 3000})   
        console.log("there is an error in adding ");
      }
    });
   }
  }
  //================
  //-> Update Store
  loadUpd(id:any,nom:string){
    this.idUpd=id;
    this.name=nom;
  }
  updStore(){
    this.storeService.update(this.idUpd,{name:this.name})
    .subscribe((data:any)=>{
      if(data){
          // this.toastr.success('A New Admin Added','New Admin',{ timeOut: 5000})
          this.getStores();
          console.log("Update store ");
          
          this.getStores();
          this.mode="list";
          this.document.location.reload();
          
      }else{
        // this.toastr.error(data['msg'],'Error',{ timeOut: 3000})   
        console.log("there is an error in updating ");
        
      }
    });

  }
  //================
  //-> Delete Store
  archStore( id:any){
    console.log("Delete Store");
    if(confirm('Are you sure to delete this store ?')){
      return this.storeService.archStore(id)
      .subscribe((data:any)=>{
        if(data){
            // this.toastr.success('An admin Has been deleted','Delete Admin',{ timeOut: 5000})
            console.log("Admin Deleted ");
            this.getStores();
            this.document.location.reload();
            
        }else{
          // this.toastr.error(data['msg'],'Error',{ timeOut: 3000})   
          console.log("there is an error in deleting");
          
        }
      })
      // To GO back to List View
      ,this.mode="list"
    }
    return true
    
  }
  //================
  // -----------------------------------------

}
