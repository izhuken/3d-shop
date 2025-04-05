from mongoengine import Document ,UUIDField, StringField, BooleanField, DictField
from datetime import datetime
from mongoengine import connect
from core.config import MONGODB_URL


connect(host=MONGODB_URL)

class Shop(Document):
    name = StringField(required=True)
    is_generated = BooleanField(default=False)
    open_at = StringField(required=True)
    close_at = StringField(required=True)
    data = DictField(required=True)
