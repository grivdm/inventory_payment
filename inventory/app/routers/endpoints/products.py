from fastapi import APIRouter, HTTPException

from app.schemas.product import ProductCreate, ProductUpdate, ProductRead
from app.services import product_service


router = APIRouter()


@router.post("", status_code=201)
def create_product_endpoint(product_params: ProductCreate):
    return product_service.create_product(product_params)


@router.get("", response_model=list[ProductRead])
def get_all_products():
    all_products = product_service.get_all_products()
    return [ProductRead(**product.dict(exclude_unset=True)) for product in all_products]


@router.get("/{pk}", response_model=ProductRead)
def get_product(pk: str):
    product = product_service.get_product(pk)
    if product:
        return ProductRead(**product.dict(exclude_unset=True))
    raise HTTPException(404, "Product not found")


@router.put("/{pk}", response_model=ProductRead)
def update_product_endpoint(pk: str, product_params: ProductUpdate):
    updated_product = product_service.update_product(pk, product_params)
    if updated_product:
        return ProductRead(**updated_product.dict(exclude_unset=True))


@router.delete("/{pk}")
def delete_product(pk: str):
    if product_service.delete_product(pk):
        return "Product deleted"
    raise HTTPException(404, "Product not found")
