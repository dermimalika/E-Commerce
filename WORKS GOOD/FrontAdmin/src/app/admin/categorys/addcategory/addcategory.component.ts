import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../model/Category';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  @Input()
  category: Category;

  @Output()
  userAddedEvent = new EventEmitter();


  constructor(private httpClientService: HttpClientService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  addCategory() {
    this.httpClientService.addCategory(this.category).subscribe(
      (category) => {

        if( category){
          this.toastr.success('Add Category!', 'Category has been added successfuly'); 
          this.userAddedEvent.emit();
          this.router.navigate(['admin', 'categorys']);
        }
        else{
          this.toastr.error('Add Category!', 'Try Again '); 
        }
      }
    );
  }
}
