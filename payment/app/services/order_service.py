import time
from fastapi import BackgroundTasks
import requests
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate
from app.dependencies import redis


async def create_order(
    order_data: OrderCreate, background_tasks: BackgroundTasks
) -> Order:
    body = order_data.dict()
    req = requests.get(f"http://inventory:8000/api/v1/products/{body['product_id']}")
    print(req.json())
    if req.status_code == 404:
        raise ValueError("Product not found")
    product = req.json()
    order = Order(
        product_id=body["product_id"],
        price=product["price"],
        quantity=body["quantity"],
        total=round(product["price"] * body["quantity"], 2),
        status="pending",
    )
    print(order)
    order.save()
    background_tasks.add_task(order_completed, order)

    return order


def order_completed(order: Order):
    time.sleep(5)
    print("Order completed background task")
    order.status = "completed"
    redis.xadd("order_completed", order.dict(), "*")
    order.save()


def get_order(pk: str) -> Order:
    return Order.get(pk)


def get_all_orders() -> list[Order]:
    all_orders = Order.all_pks()
    return [get_order(order) for order in all_orders]


def update_order(pk: str, update_data: OrderUpdate) -> Order:
    order = Order.get(pk)
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(order, key, value)
    order.save()
    return order


def delete_order(pk: str) -> bool:
    return Order.delete(pk)


def get_orders_by_product(product_id: str) -> list[Order]:
    all_orders = Order.all_pks()
    return [
        get_order(order)
        for order in all_orders
        if get_order(order).product_id == product_id
    ]
