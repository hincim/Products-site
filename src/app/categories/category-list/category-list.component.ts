import { Component, OnInit } from '@angular/core';
import { CategoryRepository } from '../../models/category.repository';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers:[CategoryService]
})
export class CategoryListComponent implements OnInit {


  categories: Category[];
  selectedCategory: Category | null;
  // categoryRepository: CategoryRepository;


  constructor(private service: CategoryService) {
    // this.categoryRepository = new CategoryRepository();
    // this.categories = this.categoryRepository.getCategories();

   }

   selectCategory(category?: Category){
    if (category) {
      this.selectedCategory = category
      this.displayAll = false
    }else{
      this.selectedCategory = null
      this.displayAll = true
    }
   }

  ngOnInit(): void {
    this.service.getCategories().subscribe(result =>{
      this.categories = result
    })

  }

  displayAll = true;



}
