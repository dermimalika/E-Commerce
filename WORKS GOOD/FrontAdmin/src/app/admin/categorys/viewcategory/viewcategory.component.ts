import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../model/Category';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.css']
})
export class ViewcategoryComponent implements OnInit {

  @Input()
  category: Category;

  @Output()
  userDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,
    private toastr: ToastrService,
     private router: Router) { }

  ngOnInit() {
  }
  
  deleteCategory() {
    this.httpClientService.archCategory(this.category.id).subscribe(
      (category) => {

        if( category){
          this.toastr.success('Delete Category!', 'Category has been deleted successfuly'); 
          this.userDeletedEvent.emit();
          this.router.navigate(['admin', 'categorys']);
        }
        else{
          this.toastr.error('Delete Category!', 'Try Again '); 
        }
      }
    );
  }

}
