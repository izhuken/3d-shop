from pydantic import BaseModel
from datetime import datetime


class UserJson(BaseModel):
    name: str
    x: int
    y: int

class ActiveEventsJson(BaseModel):
    name: str

class SalesJson(BaseModel):
    goods_type: str
    size: float

class SimulationJson(BaseModel):
    users: list[UserJson]
    active_events: list[ActiveEventsJson]
    sales: list[SalesJson]




class SimulationCreate(BaseModel):
    shop_id : str
    data: dict[str, SimulationJson]