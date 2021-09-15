import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClientService } from 'src/app/service/httpclient.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders:any [];
  displayedColumns: string[] = ["id", "createdDate", "totalPrice", "deliveryEtat", "selfdelivery", "welldelivered"];
  constructor(
    private httpClientService: HttpClientService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.httpClientService.getOrders().subscribe((data:any)=>{
      this.orders=data;
      console.log("orders in get orders :",this.orders);
      
    })
  }
  noDelivery(id:any){
    this.httpClientService.noDelivery(id).subscribe((data:any)=>{
      if( data){
        this.toastr.success('Delivery!', 'Order has been updated'); 
        this.document.location.reload();
      }
      else{
        this.toastr.error('Delivery!', 'Try Again '); 
      }
    })
  }
  delivered(id:any){
    this.httpClientService.delivered(id).subscribe((data:any)=>{
      if( data){
        this.toastr.success('Delivery!', 'Order has been updated'); 
        this.document.location.reload();
      }
      else{
        this.toastr.error('Delivery!', 'Try Again '); 
      }
      
    })
  }

}
