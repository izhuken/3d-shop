from repository.shop_repository import ShopRepository


class ShopService():
    repository = ShopRepository()

    def create(self, data: dict):
        result = self.repository.create(data=data)
        return {
            "id": result.data.id.__str__(),
            }
    
    def delete(self, id: str):
        return self.repository.delete(id)
    
    def get_by_id(self, id: str):
        result = self.repository.get_by_id(id)
        
        data = {"id": result.data.id.__str__(), "name": result.data.name, "is_generated": result.data.is_generated, "open_at": result.data.open_at, "close_at": result.data.close_at, "data" : result.data.data}

        return data
    

    def get_all(self):
        result = self.repository.get_all()

        data = [{"id": item.id.__str__(), "name": item.name, "is_generated": item.is_generated, "open_at": item.open_at, "close_at": item.close_at} for item in result.data]
        return data