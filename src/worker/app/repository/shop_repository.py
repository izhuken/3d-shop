from core.models import Shop
# from mongoengine import connect
# from core.config import MONGODB_URL
from dto import ErrorDTO, SuccessDTO


# connect(host=MONGODB_URL)

class ShopRepository():
    model = Shop

    def get_by_id(self, id: str):
        data = self.model.objects(id=id).first()
        if not data:
            return ErrorDTO('Data not found', 404)
        return SuccessDTO(data)
    
    def get_all(self):
        data = self.model.objects()
        return SuccessDTO(data)
