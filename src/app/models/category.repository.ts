import { Category } from "../categories/category.model";

export class CategoryRepository {

    private categories: Category[] = [

        {id: 1, name: "Telefon"},
        {id: 2, name: "PC"},
        {id: 3, name: "Beyaz Eşya"},
    ]

    getCategories(): Array<Category>{

        return this.categories;
    }

    getCategoryById(id: number){

        return this.categories.find(c => c.id == id);
    }
}
