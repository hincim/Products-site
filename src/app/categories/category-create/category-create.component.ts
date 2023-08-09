import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/categories/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers:[CategoryService]
})
export class CategoryCreateComponent implements OnInit {

  constructor(private service: CategoryService,
    private router : Router) { }

  ngOnInit(): void {
  }

  saveCategory(name: any){
    this.service.createCategory({id:0,name:name.value}).subscribe(result=>{
      this.router.navigate(["/products"])
    })
  }

}
