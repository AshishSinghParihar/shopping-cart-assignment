export class Product {
  category: string;
  description: string;
  id: string;
  imageURL: string;
  name: string;
  price: number;
  sku: string;
  stock: number;

  constructor(data: any) {
    this.category = data.category;
    this.description = data.description;
    this.id = data.id;
    this.imageURL = data.imageURL;
    this.name = data.name;
    this.price = data.price;
    this.sku = data.sku;
    this.stock = data.stock;
  }
}
