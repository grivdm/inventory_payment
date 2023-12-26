from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(product_data: ProductCreate) -> Product:
    product = Product(**product_data.dict())
    return product.save()


def update_product(pk: str, update_data: ProductUpdate) -> Product:
    product = Product.get(pk)
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    product.save()
    return product


def delete_product(pk: str) -> bool:
    return Product.delete(pk)


def get_product(pk: str) -> Product:
    return Product.get(pk)


def get_all_products() -> list[Product]:
    all_products = Product.all_pks()
    return [get_product(product) for product in all_products]
