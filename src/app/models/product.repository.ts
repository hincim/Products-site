import { Product } from "../products/product.model";

export class ProductRepository {
    
    private products: Product[] = [
        {
          id: 1,
          name: "iphone 11",
          price: 900,
          imageUrl: "2.jpeg",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tenetur corporis repellat fdfd temporibus illum, fugiat blanditiis aperiam labore deleniti.",
          isActive: true,
          categoryId: 1
        },
        {
          id: 2,
          name: "iphone 12",
          price: 900,
          imageUrl: "3.jpeg",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tenetur corporis repellat fdfd temporibus illum, fugiat blanditiis aperiam labore deleniti.",
          isActive: true,
          categoryId: 2
        },
        {
          id: 3,
          name: "iphone 13",
          price: 900,
          imageUrl: "1.jpeg",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tenetur corporis repellat dfdfd temporibus illum, fugiat blanditiis aperiam labore deleniti.",
          isActive: false,
          categoryId: 2
        },
        {
          id: 4,
          name: "iphone 14",
          price: 900,
          imageUrl: "1.jpeg",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tenetur corporis repellat dfdfd temporibus illum, fugiat blanditiis aperiam labore deleniti.",
          isActive: false,
          categoryId: 1
        },{
          id: 5,
          name: "iphone 15",
          price: 900,
          imageUrl: "2.jpeg",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tenetur corporis repellat dfdfd temporibus illum, fugiat blanditiis aperiam labore deleniti.",
          isActive: false,
          categoryId: 1
        },{
          id: 6,
          name: "iphone 16",
          price: 900,
          imageUrl: "3.jpeg",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At tenetur corporis repellat dfdfd temporibus illum, fugiat blanditiis aperiam labore deleniti.",
          isActive: false,
          categoryId: 3
        },
      ];

      getProducts(): Product[]{
        return this.products.filter(p=>p.isActive);
      }
    
      getProductById(id: number): Product|undefined{
        return this.products.find(p=>p.id==id)
      }

      getProductsByCategoryId(id: number): Product[]{
        return this.products.filter(p=>p.categoryId == id);
      }
}