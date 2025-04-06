from repository.report_repository import ReportRepository

# from app.schemas.simulation import ReportRepository


class ReportService():
    repository = ReportRepository()

    def create(self, shop_id: str,data: list):
        return self.repository.create(shop_id=shop_id, data=data)

    
    # def delete(self, id: str):
    #     return self.repository.delete(id)
    
    # def get_by_id(self, id: str):
    #     result = self.repository.get_by_id(id)
    #     print(result)
    #     print(result.data.shop.name)
    #     data = {"id": result.data.id.__str__(), "shop_name": result.data.shop.name, "data": result.data.data}
    #     return data
    

    # def get_all(self):
    #     result = self.repository.get_all()

    #     data = [{"id": item.id.__str__()} for item in result.data]

    #     return data