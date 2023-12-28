from redis_om import HashModel

from app.dependencies import redis


class Order(HashModel):
    product_id: str
    price: float
    quantity: int
    total: float
    status: str

    class Meta:
        database = redis
