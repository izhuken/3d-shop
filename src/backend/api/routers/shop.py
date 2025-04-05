from fastapi import APIRouter #noqa
from app.service.shop_service import ShopService
from app.schemas.shop import ShopCreate
from app.service.kafka_service import KafkaService
from core.config import TOPIC_PLAY



shop_router = APIRouter(tags=["Shop"])
shop_service = ShopService()
kafka_service = KafkaService()


@shop_router.get("/shop/play/{id}")
def play(id: str):
    kafka_service.produce(key="get_play", value=id, topic = TOPIC_PLAY)
    return {"ok": True}
    

@shop_router.get("/shop")
def get_shop():
    return shop_service.get_all()

@shop_router.post("/shop")
def create_shop(data: ShopCreate):
    return shop_service.create(data)

@shop_router.delete("/shop")
def delete_shop(id: str):
    return shop_service.delete(id)

@shop_router.get("/shop/{id}")
def get_shop_by_id(id: str):
    return shop_service.get_by_id(id)

