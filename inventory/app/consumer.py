import time

from app.dependencies import redis
from app.models.product import Product


group = "inventory-group"
key = "order_completed"

try:
    redis.xgroup_create(key, group)
except:
    print("Group already exists")

while True:
    try:
        results = redis.xreadgroup(group, key, {key: ">"}, None)
        if results:
            for result in results:
                for message in result[1]:
                    product = Product.get(message[1]["product_id"])
                    if product and product.quantity >= int(message[1][b"quantity"]):
                        print(product)
                        product.quantity -= int(message[1][b"quantity"])
                        product.save()
                    else:
                        redis.xadd("refund_order", message[1], "*")
    except Exception as e:
        print(e)
    time.sleep(1)
