from mongoengine import BooleanField, DictField, Document, StringField


class Shop(Document):
    name = StringField(required=True)
    is_generated = BooleanField(default=False)
    open_at = StringField(required=True)
    close_at = StringField(required=True)
    data = DictField(required=True)
