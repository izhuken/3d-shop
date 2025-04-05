from core.models.goods import Goods
# from mongoengine import connect
# from core.config import MONGODB_URL
from dto import ErrorDTO, SuccessDTO

# connect(host=MONGODB_URL)

class GoodsRepository():
    model = Goods

    def create(self, data: dict):
        insert_data = data.model_dump(exclude_unset=True)
        new_data = self.model(goods_type=insert_data['goods_type'], cost=insert_data['cost'])
        new_data.save()
        return SuccessDTO(insert_data)
    
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
