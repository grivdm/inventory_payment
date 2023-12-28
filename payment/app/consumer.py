import time

from app.dependencies import redis
from app.models.order import Order

group = "payment-group"
key = "refund_order"


try:
    redis.xadd(key, {"pk": 1}, "*")
    redis.xgroup_create(key, group)
except:
    print("Group already exists")

while True:
    try:
        results = redis.xreadgroup(group, key, {key: ">"}, None)
        if results:
            for result in results:
                for message in result[1]:
                    order = Order.get(message[1]["pk"])
                    if order:
                        order.status = "refunded"
                        order.save()
                    else:
                        redis.xadd("refund_order", message[1], "*")
    except Exception as e:
        print(e)
    time.sleep(1)
