import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductRepository } from '../models/product.repository';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers:[ProductService]
})
export class ProductListComponent implements OnInit {

  products: Product[]=[];
  // productRepo: ProductRepository;
  loading: boolean = false;

    constructor(private route: ActivatedRoute, private service: ProductService) {
    // this.productRepo = new ProductRepository();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
    this.loading = true;
    this.service.getProducts(params["categoryId"]).subscribe(result =>{
        this.products = result;
        this.loading = false;
    })


      // if (params["categoryId"]) {
      //   // this.products = this.productRepo.getProductsByCategoryId(params["categoryId"]);
      // }else{
        
      //   this.service.getProducts().subscribe(result =>{
      //   for (const key in result) {
      //     // console.log(key);
      //     // console.log(result[key]);
      //     this.products.push( {...result[key], id:key});
      //   } 
      //   })
      // }
      
    })
  }


}
