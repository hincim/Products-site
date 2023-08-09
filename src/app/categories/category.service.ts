import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { ServicesUtil } from "../util/services.util";
import { Category } from "./category.model";


@Injectable()
export class CategoryService{


    constructor(private http: HttpClient,
        private servicesUtil: ServicesUtil){

    }

    getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(this.servicesUtil.servicesUrl +"categories.json")
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
        return this.http.post<Category>(this.servicesUtil.servicesUrl+"categories.json",category);
    }

}