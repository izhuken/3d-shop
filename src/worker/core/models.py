# from config import MONGODB_URL  #noqa
from mongoengine import (
    CASCADE,
    BooleanField,
    DictField,
    Document,
    FloatField,
    ListField,
    ReferenceField,
    StringField,
    connect,
)

connect('main', username="mongodb", host='127.0.0.1', password="mongodb", port=27017, alias="db1")


class Goods(Document):
    goods_type = StringField(required=True)
    cost = FloatField()

    meta = {"db_alias": "db1"}


class Shop(Document):
    name = StringField(required=True)
    is_generated = BooleanField(default=False)
    open_at = StringField(required=True)
    close_at = StringField(required=True)
    data = DictField(required=True)

    meta = {"db_alias": "db1"}

    # users: list[UserJson]
    # active_events: list[ActiveEventsJson]
    # sales: list[SalesJson]

class Simulation(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    data = DictField(required=True)

    meta = {"db_alias": "db1"}

class HeatMap(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    matrix = ListField(required=True)
    meta = {"db_alias": "db1"}

class Report(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    report = ListField(required=True)
    meta = {"db_alias": "db1"}