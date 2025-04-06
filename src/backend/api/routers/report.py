from fastapi import APIRouter #noqa
from app.service.report_service import ReportService



report_router = APIRouter(tags=["Report"])
report_service = ReportService()


@report_router.get("/report")
def get_report():
    return report_service.get_all()

# @report_router.post("/heat-map")
# def create_report(data: list):
#     return report_service.create(data)

@report_router.delete("/report")
def delete_report(id: str):
    return report_service.delete(id)

@report_router.get("/report/{id}")
def get_report_by_id(id: str):
    return report_service.get_by_id(id)