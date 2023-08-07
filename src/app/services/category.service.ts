import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Category } from "../models/category";
import { ServicesUtil } from "./services.util";


@Injectable()
export class CategoryService{


    constructor(private http: HttpClient,
        private servicesUtil: ServicesUtil){

    }

    getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(this.servicesUtil.categoryServicesUrl +"categories.json")
        .pipe(
            map(result =>{
                const categories: Category[] = [];
                for (const key in result) {
                   categories.push( {...result[key],id:key});
                  } 
                return categories;
            })
        );
    }

    createCategory(category: Category): Observable<Category>{
        return this.http.post<Category>(this.servicesUtil.categoryServicesUrl+"categories.json",category);
    }

}