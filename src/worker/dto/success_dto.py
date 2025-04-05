from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")


@dataclass
class SuccessDTO(Generic[T]):
    data: T | None = None
    url: str | None = None

    def __init__(self, data: T):
        self.data = data

    def set_url(self, url):
        self.url = url