import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product";
import { Observable, map, tap, delay, take, exhaustMap } from "rxjs";
import { AuthService } from "./auth.service";
import { ServicesUtil } from "./services.util";


//local service
@Injectable()
export class ProductService{


    constructor(private http: HttpClient,
        private authService: AuthService,
        private servicesUtil: ServicesUtil){

    }

    getProducts(categoryId: number): Observable<Product[]>{
        return this.http.get<Product[]>(this.servicesUtil.productServicesUrl+"products.json").pipe(
            map(result =>{
                const products: Product[] = [];
                for (const key in result) {
                    if (categoryId) {
                        if (categoryId == result[key].categoryId) {
                            products.push( {...result[key], id:key});
                        }
                    }else {
                        products.push( {...result[key], id:key});
                    }
                  } 
                return products;
            }),
            tap(result => console.log(result)),
            delay(1000)
        );
    }

    getProductById(id: string): Observable<Product>{
        return this.http.get<Product>(this.servicesUtil.productServicesUrl+"products/"+id+".json").pipe(
            delay(1000)
        );
    }

    createProducts(product: Product): Observable<Product>{
        
        return this.authService.user.pipe(
            take(1),
            tap(user =>console.log(user)
            ),
            exhaustMap(user =>{
                return this.http.post<Product>(this.servicesUtil.productServicesUrl+"products.json?auth=" + user?.token,product)
            })
        )
    }

}