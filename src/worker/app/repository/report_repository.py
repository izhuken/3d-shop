from core.models import Report, Shop
from dto import ErrorDTO, SuccessDTO

# insert_data = data.model_dump(exclude_unset=True)
    # new_data = self.model(goods_type=insert_data['goods_type'], cost=insert_data['cost'])
    # new_data.save()
    
    # return SuccessDTO(insert_data)

class ReportRepository():
    model = Report

    def create(self, shop_id: str ,data: list):
        # insert_data = data.model_dump(exclude_unset=True)
        shop = Shop.objects(id=shop_id).first()
        
        if not shop:
            return ErrorDTO('Shop not found', 404)

        new_data = self.model(shop=shop, report=data)
        new_data.save()

        return SuccessDTO(new_data)