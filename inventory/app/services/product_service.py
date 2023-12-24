from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(product_data: ProductCreate) -> Product:
    print(product_data.dict())
    product = Product(**product_data.dict())
    return product.save()


def update_product(product_id: str, update_data: ProductUpdate) -> Product:
    product = Product.get(product_id)
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(product, key, value)
    product.save()
    return product


def delete_product(product_id: str) -> bool:
    return Product.delete(product_id)


def get_product(pk: str) -> Product:
    return Product.get(pk)


def get_all_products() -> list[Product]:
    all_products = Product.all_pks()
    return [get_product(product) for product in all_products]
