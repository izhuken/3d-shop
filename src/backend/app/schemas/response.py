from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class SuccessResponse(BaseModel):
    detail: str


class PaginateResponse(BaseModel, Generic[T]):
    data: list[T]
    page: int
    next_page: str | None = None
    previous_page: str | None = None


class PaginateBase(BaseModel):
    page: int
    next_page: str | None = None
    previous_page: str | None = None


class ErrorResponse(BaseModel):
    detail: str
    status_code: int