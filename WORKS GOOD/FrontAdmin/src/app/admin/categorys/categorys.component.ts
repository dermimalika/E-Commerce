import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/Category';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/httpclient.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})
export class CategorysComponent implements OnInit {

  categorys: Array<Category>;
  selectedCategory: Category;
  action: string;

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getCategorys().subscribe(
      response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];
        const selectedCategoryId = params['id'];
        if (selectedCategoryId) {
          this.selectedCategory = this.categorys.find(category => category.id === +selectedCategoryId);
        }
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.categorys = response;
  }

  viewCategory(id: number) {
    this.router.navigate(['admin', 'categorys'], { queryParams: { id, action: 'view' } });
  }

  addCategory() {
    this.selectedCategory = new Category();
    this.router.navigate(['admin', 'categorys'], { queryParams: { action: 'add' } });
  }
}
