from redis_om import HashModel

from app.dependencies import redis


class Product(HashModel):
    name: str
    quantity: int
    price: float

    class Meta:
        database = redis
