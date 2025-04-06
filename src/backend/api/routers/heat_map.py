from fastapi import APIRouter #noqa
from app.service.heat_map_service import HeatMapService



heat_map_router = APIRouter(tags=["HeatMap"])
heat_map_service = HeatMapService()


@heat_map_router.get("/heat-map")
def get_heat_map():
    return heat_map_service.get_all()

# @heat_map_router.post("/heat-map")
# def create_heat_map(data: list):
#     return heat_map_service.create(data)

@heat_map_router.delete("/heat-map")
def delete_heat_map(id: str):
    return heat_map_service.delete(id)

@heat_map_router.get("/heat-map/{id}")
def get_heat_map_by_id(id: str):
    return heat_map_service.get_by_id(id)