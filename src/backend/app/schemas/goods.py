from pydantic import BaseModel

class GoodsCreate(BaseModel):
    goods_type: str
    cost: float

class Goods(BaseModel):
    id: str
    goods_type: str
    cost: float

class Goodses(BaseModel):
    data: list[Goods]
    