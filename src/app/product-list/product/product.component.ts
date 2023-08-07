import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductRepository } from 'src/app/models/product.repository';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit {

  product: Product|undefined;
  // productRepository: ProductRepository;
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private service: ProductService) {
    // this.productRepository = new ProductRepository();
   }

  ngOnInit(): void {

    this.route.params.subscribe(params =>{
      const id = params["productId"];
      // this.product = this.productRepository.getProductById(id);
      this.loading = true;
      this.service.getProductById(id).subscribe(result =>{
          this.product = {...result, id: id};
          this.loading = false;
          console.log({...result, id: id});
          console.log(result);
          
      })
    })
  }

}
