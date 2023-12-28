from fastapi import APIRouter, BackgroundTasks
from app.services import order_service
from app.schemas.order import OrderCreate, OrderUpdate, OrderRead


router = APIRouter()


@router.post("", status_code=201)
async def create_order(order_data: OrderCreate, background_tasks: BackgroundTasks):
    return await order_service.create_order(order_data, background_tasks)


@router.get("", response_model=list[OrderRead])
def get_all_orders():
    all_orders = order_service.get_all_orders()
    return [OrderRead(**order.dict(exclude_unset=True)) for order in all_orders]


@router.get("/{pk}", response_model=OrderRead)
def get_order(pk: str):
    order = order_service.get_order(pk)
    return OrderRead(**order.dict(exclude_unset=True))


@router.put("/{pk}", response_model=OrderRead)
def update_order(pk: str, request: OrderUpdate):
    order = order_service.update_order(pk, request)
    return OrderRead(**order.dict(exclude_unset=True))


@router.delete("/{pk}")
def delete_order(pk: str):
    return order_service.delete_order(pk)


@router.get("/product/{product_id}", response_model=list[OrderRead])
def get_orders_by_product(product_id: str):
    all_orders = order_service.get_orders_by_product(product_id)
    return [OrderRead(**order.dict(exclude_unset=True)) for order in all_orders]
