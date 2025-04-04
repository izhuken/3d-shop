from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")


@dataclass
class ErrorDTO(Generic[T]):
    detail: T | None = None
    status_code: int | None = None

    def __init__(self, detail: T, status_code: int):
        self.detail = detail
        self.status_code = status_code