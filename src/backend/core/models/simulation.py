from mongoengine import Document, UUIDField, DictField, ReferenceField, CASCADE
from .shop import Shop
from mongoengine import connect
from core.config import MONGODB_URL


connect(host=MONGODB_URL)
class Simulation(Document):
    shop = ReferenceField(Shop, reverse_delete_rule=CASCADE)
    data = DictField()