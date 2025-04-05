from core.models.goods import Shop
# from mongoengine import connect
# from core.config import MONGODB_URL
from dto import ErrorDTO, SuccessDTO


# connect(host=MONGODB_URL)

class ShopRepository():
    model = Shop

    def create(self, data: dict):
        insert_data = data.model_dump(exclude_unset=True)
        print(insert_data)
        new_data = self.model(name=insert_data['name'], is_generated=insert_data['is_generated'], open_at=insert_data['open_at'], close_at=insert_data['close_at'], data=insert_data['data'])
        new_data.save()

        print(new_data)
        
        return SuccessDTO({"ok": True})
    
    def delete(self, id: str):
        data = self.model.objects(id=id).first()
        if not data:
            return ErrorDTO('Data not found', 404)
        data.delete()
        return SuccessDTO('Entity success deleted')
    
    def get_by_id(self, id: str):
        data = self.model.objects(id=id).first()
        if not data:
            return ErrorDTO('Data not found', 404)
        return SuccessDTO(data)
    
    def get_all(self):
        data = self.model.objects()
        return SuccessDTO(data)
