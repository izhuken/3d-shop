from core.models.goods import Simulation, Shop
# from mongoengine import connect
# from core.config import MONGODB_URL
from dto import ErrorDTO, SuccessDTO



# connect(host=MONGODB_URL)


class SimulationRepository():
    model = Simulation

    def create(self, data: dict):
        insert_data = data.model_dump(exclude_unset=True)
        shop = Shop.objects(id=insert_data['shop_id']).first()
        
        if not shop:
            return ErrorDTO('Shop not found', 404)

        new_data = self.model(shop=shop, data=insert_data['data'])
        new_data.save()

        return SuccessDTO(new_data)
    
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
