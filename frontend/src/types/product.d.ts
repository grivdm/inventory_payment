export interface IProduct {
  pk: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IProductCreate {
  name: string;
  price: number;
  quantity: number;
}
