from faker import Faker

FAKER_SALES = []
FAKER_GOODSES = []

fake = Faker(["ru_RU"])

def prepareting_sales(sales):
    for sale in sales:
        if sale.get("goods_type", None):
            FAKER_SALES.append(sale.get("goods_type"))

def prepareting_goodses(goodses):
    for goods in goodses:
        for key in goods.keys():
            FAKER_GOODSES.append(f"{key}")

def generation_users(count, sales, goodses):
    users = []
    prepareting_goodses(goodses)
    prepareting_sales(sales)
    for i in range(count):
        name = fake.name()
        if i % 3 == 0:
            sale = fake.random_element(elements=FAKER_SALES)
        else:
            sale = None
        if i % 2 == 0:
            goods_type = fake.random_element(elements=FAKER_GOODSES)
        else:
            goods_type = None
        users.append({"name": name, "sales": sale, "goods_type": goods_type, "cart": {}, "total_cost": 0, "rate": 7})
    return users