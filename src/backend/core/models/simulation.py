from mongoengine import CASCADE, DictField, Document, ReferenceField

from .shop import Shop


class Simulation(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    data = DictField()
