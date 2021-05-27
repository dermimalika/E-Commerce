import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../../model/Category';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';


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
    private router: Router) { }

  ngOnInit() {
  }

  addCategory() {
    this.httpClientService.addCategory(this.category).subscribe(
      (category) => {
        this.userAddedEvent.emit();
        this.router.navigate(['admin', 'categorys']);
      }
    );
  }
}
