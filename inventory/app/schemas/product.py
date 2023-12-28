from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    quantity: int
    price: float


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class ProductRead(ProductBase):
    pk: str
