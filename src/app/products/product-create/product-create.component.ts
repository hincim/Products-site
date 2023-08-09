import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from '../../categories/category.service';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/categories/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers:[ProductService, CategoryService]
})
export class ProductCreateComponent implements OnInit {

  categories: Category[] = [];
  error: string = "";
  model:any = {
    category: "0"
  };

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(result =>{
        this.categories = result
    })
  }

  saveProduct(form: NgForm){

    // name:any,price:any,imageUrl:any,description:any,isActive:any,categoryId:any
    // if (name.value == "") {
    //   this.error = "Ad alanı boş olamaz"
    //   return;
    // }
    // if (price.value == "") {
    //   this.error = "Fiyat alanı boş olamaz"
    //   return;
    // }

    const extensions = ["jpeg","jpg","png"];
    const extension = this.model.imageUrl.split(".").pop();

    if (extensions.indexOf(extension) == -1) {
      this.error = "Uzantı jpeg, jpg veya png olmalı";
      return;
    }

    if (this.model.categoryId == "0") {
      this.error = "Kategori seçmelisiniz";
      return;
    }

      const product =  {
      id: 1,
      name:this.model.name,
      price: this.model.price,
      imageUrl: this.model.imageUrl,
      description: this.model.description,
      isActive: this.model.isActive,
      categoryId: this.model.categoryId
    };

    if (form.valid) {
      this.productService.createProducts(product).subscribe(result =>{
        this.router.navigate(["/products"]);
    })
    
    }else{ 
      this.error = "Formu kontrol ediniz";
    }
    
  }

}
