from pydantic import BaseModel

from app.models.order import OrderStatus


class OrderBase(BaseModel):
    product_id: str
    price: float
    quantity: int
    total: float
    status: OrderStatus


class OrderCreate(BaseModel):
    product_id: str
    quantity: int


class OrderUpdate(OrderBase):
    pass


class OrderRead(OrderBase):
    pk: str
