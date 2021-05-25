import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../model/Category';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';

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

  constructor(private httpClientService: HttpClientService, private router: Router) { }

  ngOnInit() {
  }

  deleteCategory() {
    this.httpClientService.deleteCategory(this.category.id).subscribe(
      (category) => {
        this.userDeletedEvent.emit();
        this.router.navigate(['admin', 'categorys']);
      }
    );
  }

}
