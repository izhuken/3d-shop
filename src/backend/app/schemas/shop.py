from pydantic import BaseModel
from typing import Any


class SalesJsonDict(BaseModel):
    goods_type: str
    days: int
    size: float

class ShopJsonData(BaseModel):
    users_per_day: int
    scene: list[list[str | None]]
    events: dict[str, dict]
    sales: list[SalesJsonDict]

class ShopCreate(BaseModel):
    name: str
    is_generated: bool
    open_at: str
    close_at: str
    data: ShopJsonData




