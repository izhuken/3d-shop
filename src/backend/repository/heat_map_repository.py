from core.models.goods import HeatMap, Shop
from dto import ErrorDTO, SuccessDTO

# insert_data = data.model_dump(exclude_unset=True)
    # new_data = self.model(goods_type=insert_data['goods_type'], cost=insert_data['cost'])
    # new_data.save()
    
    # return SuccessDTO(insert_data)

class HeatMapRepository():
    model = HeatMap

    def create(self, shop_id: str ,data: list):
        # insert_data = data.model_dump(exclude_unset=True)
        shop = Shop.objects(id=shop_id).first()
        
        if not shop:
            return ErrorDTO('Shop not found', 404)

        new_data = self.model(shop=shop, matrix=data)
        new_data.save()

        return SuccessDTO(new_data)

    def delete(self, id: str):
        data = self.model.objects(id=id).first()
        if not data:
            return ErrorDTO('Data not found', 404)
        data.delete()
        return SuccessDTO('Entity success deleted')
    
    def get_by_id(self, id: str):
        shop = Shop.objects(id=id).first()
        
        if not shop:
            return ErrorDTO('Shop not found', 404)
        
        data = self.model.objects(shop=shop).first()

        if not data:
            return ErrorDTO('Data not found', 404)
        
        return SuccessDTO(data)
    
    def get_all(self):
        data = self.model.objects()
        return SuccessDTO(data)