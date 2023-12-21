from redis_om import get_redis_connection, HashModel
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
from enum import Enum
import os


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_HOSTS"),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


redis = get_redis_connection(
    host=os.getenv("REDIS_HOST"),
    port=os.getenv("REDIS_PORT"),
    password=os.getenv("REDIS_PASSWORD"),
    decode_responses=True
)


class OrderStatus(Enum):
    PENDING = 'pending'
    COMPLETED = 'completed'


class Order(HashModel):
    product_id: str
    price: float
    quantity: int
    total: float
    status: OrderStatus

    class Meta:
        database = redis


@app.post('/order', status_code=201)
async def create_order(request: Request):
    body = await request.json()
    req = requests.get(f'http://inventory:8000/product/{body["product_id"]}')
    if req.status_code == 404:
        return {'error': 'Product not found'}
    product = req.json()
    order = Order(
        product_id=body['product_id'],
        price=product['price'],
        quantity=body['quantity'],
        total=product['price'] * body['quantity'],
        status=OrderStatus.PENDING
    )
    order.save()
    return order


def order_completed(order: Order):
    order.status = OrderStatus.COMPLETED
    order.save()


@app.get('/order/{pk}')
def get_order(pk: str):
    return Order.get(pk)


@app.get('/order')
def get_orders():
    return Order.all_pks()


@app.put('/order/{pk}')
def update_order(pk: str, order_edit_params: Order):
    return Order.get(pk).update(**order_edit_params.dict(exclude_unset=True))


@app.delete('/order/{pk}')
def delete_order(pk: str):
    return Order.delete(pk)
