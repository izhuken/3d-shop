from fastapi import APIRouter #noqa
from app.service.goods_service import GoodsService
from app.schemas.goods import GoodsCreate



goods_router = APIRouter(tags=["Goods"])
goods_service = GoodsService()


@goods_router.get("/goods")
def get_goods():
    return goods_service.get_all()

@goods_router.post("/goods")
def create_goods(data: GoodsCreate):
    return goods_service.create(data)

@goods_router.delete("/goods")
def delete_goods(id: str):
    return goods_service.delete(id)

@goods_router.get("/goods/{id}")
def get_goods_by_id(id: str):
    return goods_service.get_by_id(id)