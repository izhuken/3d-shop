from core.models import Simulation, Shop

from dto import ErrorDTO, SuccessDTO





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
