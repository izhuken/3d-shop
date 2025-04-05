from fastapi import APIRouter #noqa
from app.service.simulation_service import SimulationService
from app.schemas.simulation import SimulationCreate



simulation_router = APIRouter(tags=["Simulation"])
simulation_service = SimulationService()


@simulation_router.get("/simulation")
def get_simulation():
    return simulation_service.get_all()

@simulation_router.post("/simulation")
def create_simulation(data: SimulationCreate):
    return simulation_service.create(data)

@simulation_router.delete("/simulation")
def delete_simulation(id: str):
    return simulation_service.delete(id)

@simulation_router.get("/simulation/{id}")
def get_simulation_by_id(id: str):
    return simulation_service.get_by_id(id)