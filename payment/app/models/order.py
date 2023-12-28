from enum import Enum
from redis_om import HashModel

from app.dependencies import redis


class OrderStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    refunded = "refunded"


class Order(HashModel):
    product_id: str
    price: float
    quantity: int
    total: float
    status: OrderStatus

    class Meta:
        database = redis
