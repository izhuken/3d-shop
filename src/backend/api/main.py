from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import (goods_router, shop_router, simulation_router)


app = FastAPI(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(goods_router, prefix="/v1")
app.include_router(shop_router, prefix="/v1")
app.include_router(simulation_router, prefix="/v1")