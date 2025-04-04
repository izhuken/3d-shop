from datetime import datetime
from uuid import UUID, uuid4

from core.database import BASE
from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column


class BaseModel(BASE):
    __abstract__ = True
    
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4, unique=True)
    create_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())