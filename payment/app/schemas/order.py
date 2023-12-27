from pydantic import BaseModel


class OrderBase(BaseModel):
    product_id: str
    price: float
    quantity: int
    total: float
    status: str


class OrderCreate(BaseModel):
    product_id: str
    quantity: int


class OrderUpdate(OrderBase):
    pass


class OrderRead(OrderBase):
    pk: str
