from redis_om import get_redis_connection, HashModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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
    decode_responses=True,
)


class Product(HashModel):
    name: str
    quantity: int
    price: float

    class Meta:
        database = redis


class ProductEdit(BaseModel):
    name: str = None
    quantity: int = None
    price: float = None


@app.get("/product")
def get_product():
    return Product.all_pks()


@app.post("/product", status_code=201)
def create_product(product: Product):
    return product.save()


@app.get("/product/{pk}")
def get_product(pk: str):
    return Product.get(pk)


@app.put("/product/{pk}")
def update_product(pk: str, product_edit_params: ProductEdit):
    return Product.get(pk).update(**product_edit_params.dict(exclude_unset=True))


@app.delete("/product/{pk}")
def delete_product(pk: str):
    return Product.delete(pk)
