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

from core.config import MONGO_DB, MONGO_HOST, MONGO_PASS, MONGO_PORT, MONGO_USER

connect(
    MONGO_DB,
    username=MONGO_USER,
    host=MONGO_HOST,
    password=MONGO_PASS,
    port=MONGO_PORT,
    alias="db1",
)


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


class Simulation(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    data = DictField()
    meta = {"db_alias": "db1"}

class HeatMap(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    matrix = ListField(required=True)
    meta = {"db_alias": "db1"}

class Report(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    report = ListField(required=True)
    meta = {"db_alias": "db1"}