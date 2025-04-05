from repository.simulation_repository import SimulationRepository

from app.schemas.simulation import SimulationCreate


class SimulationService():
    repository = SimulationRepository()

    def create(self, data: SimulationCreate):
        return self.repository.create(data=data)
        
    
    def delete(self, id: str):
        return self.repository.delete(id)
    
    def get_by_id(self, id: str):
        result = self.repository.get_by_id(id)
        print(result)
        print(result.data.shop.name)
        data = {"id": result.data.id.__str__(), "shop_name": result.data.shop.name, "data": result.data.data}
        return data
    

    def get_all(self):
        result = self.repository.get_all()

        data = [{"id": item.id.__str__()} for item in result.data]

        return data