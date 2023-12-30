export enum OrderStatus {
  pending = "pending",
  completed = "completed",
  refunded = "refunded",
}

export interface Order {
  product_id: str;
  price: float;
  quantity: int;
  total: float;
  status: OrderStatus;
}
