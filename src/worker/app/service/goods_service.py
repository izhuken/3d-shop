from repository.goods_repository import GoodsRepository


class GoodsService():
    repository = GoodsRepository()
        
    def get_by_id(self, id: str):
        result = self.repository.get_by_id(id)
        data = {"id": result.data.id.__str__(), "goods_type": result.data.goods_type, "cost": result.data.cost}
        return data
    

    def get_all(self):
        result = self.repository.get_all()

        data = [{"id": item.id.__str__(), "goods_type": item.goods_type, "cost": item.cost} for item in result.data]

        return data
