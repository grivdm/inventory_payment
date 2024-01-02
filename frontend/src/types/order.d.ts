enum OrderStatus {
  pending = "pending",
  completed = "completed",
  refunded = "refunded",
}

export interface IOrder {
  product_id: str;
  price: float;
  quantity: int;
  total: float;
  status: OrderStatus;
  pk: str;
}

export interface IOrderCreate {
  product_id: str;
  quantity: int;
}
