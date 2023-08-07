import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';

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
