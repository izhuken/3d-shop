from core.models import Goods
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO


class GoodsRepository():
    model = Goods

    
    def get_by_id(self, id: str):
        data = self.model.objects(id=id).first()
        if not data:
            return ErrorDTO('Data not found', 404)
        return SuccessDTO(data)
    
    def get_all(self):
        data = self.model.objects()
        return SuccessDTO(data)
