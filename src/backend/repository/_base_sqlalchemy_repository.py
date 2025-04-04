from uuid import UUID

from core.database import SESSION
from core.models._base import BaseModel
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import Select, delete, select, update
from sqlalchemy.exc import DBAPIError, IntegrityError
from sqlalchemy.orm import selectinload
from sqlalchemy.orm.attributes import flag_modified

from ._base_repository import IBaseRepository


class BaseSQLAlchemyRepository(IBaseRepository):
    model: BaseModel
    additional_tables: list[str] | None = None
    soft_deletion: bool = False
    async def get_all(
        self, page: int = 0, limit: int = 30, order_by: str | None = None, **kwargs
    ) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = select(self.model)
        if self.additional_tables:
            _nested = []
            for additional_table in self.additional_tables:
                current_model = additional_table
                if isinstance(additional_table, str):
                    print(1, current_model)
                    current_model = getattr(self.model, additional_table)
                _nested.append(selectinload(current_model))
            statement = statement.options(*_nested)
        statement = (
            statement.select_from(self.model).offset((page - 1) * limit).limit(limit)
        )
        if kwargs.get('user_id', False):
            statement = statement.filter(self.model.user_id == kwargs['user_id'])
        # if kwargs.get('search_fields', False):
        #     for key, value in kwargs['search_fields'].items():
        #         if hasattr(self.model, key):
        #             if isinstance(value, str):
        #                 statement = statement.filter(
        #                     getattr(self.model, key).ilike(f'%{value}%')
        #                 )
        #             elif isinstance(value, datetime.date):
        #                 statement = statement.filter(
        #                     func.date(getattr(self.model, key)) == value
        #                 )
        #             else:
        #                 statement = statement.filter(
        #                     *[getattr(self.model, key) == value]
        #                 )
        # if kwargs.get('search_date_to_from', False):
        #     search_field = kwargs['search_date_to_from'].get('date_search_field', False)
        #     if hasattr(self.model, search_field):
        #         del kwargs['search_date_to_from']['date_search_field']
        #         statement = statement.filter(
        #             *[
        #                 func.date(getattr(self.model, search_field)) >= value
        #                 if key == 'date_to'
        #                 else func.date(getattr(self.model, search_field)) <= value
        #                 for key, value in kwargs['search_date_to_from'].items()
        #             ]
        #         )
        statement = self._ordering_statement(statement, order_by)
        
        try:
            async with SESSION() as session:
                statement = await session.execute(statement)
                data = statement.scalars().unique().all()
                if data is None:
                    return ErrorDTO('Data not found', 404)
                return SuccessDTO[self.model](data)
        
        except DBAPIError as e:
            print(e)
            return ErrorDTO('Database error', 500)
        
    async def get_by_condition(
        self, **kwargs
    ) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = select(self.model)
        if self.additional_tables:
            _nested = []
            for additional_table in self.additional_tables:
                current_model = additional_table
                if isinstance(additional_table, str):
                    current_model = getattr(self.model, additional_table)
                    _nested.append(selectinload(current_model))
                else:
                    _nested.append(current_model)
            statement = statement.options(*_nested)
        statement = statement.select_from(self.model).filter(
            *[getattr(self.model, key) == value for key, value in kwargs.items()]
        )
        try:
            async with SESSION() as session:
                statement = await session.execute(statement)
                data = statement.scalar()
                if not data:
                    return ErrorDTO('Data not found', 404)
                return SuccessDTO[self.model](data)
        except DBAPIError:
            return ErrorDTO('Database error', 500)
        
    async def create(
        self, data: dict, **kwargs
    ) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        insert_data = self.model(**data.model_dump(exclude_unset=True))
        if kwargs.get('file', False):
            insert_data.url = kwargs.get('file')
        try:
            async with SESSION() as session:
                session.add(insert_data)
                await session.commit()
                return SuccessDTO[self.model](insert_data)
        except IntegrityError as e:
            print(e)
            return ErrorDTO('Data already exists', 400)
        
    async def update(
        self, id: UUID, data: dict | BaseModel
    ) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = update(self.model)
        if self.additional_tables:
            statement = statement.options(
            *[
                selectinload(add_table)
                for add_table in [
                    getattr(self.model, additional_table)
                    for additional_table in self.additional_tables
                ]
            ]
        )
        payload = data
        if not isinstance(data, dict):
            payload = data.model_dump(mode='json', exclude_unset=True)
        statement = (
            statement.values(**payload)
            .where(self.model.id == str(id))
            .returning(self.model)
        )
        try:
            async with SESSION() as session:
                data = (await session.execute(statement)).unique().scalar()
                if data is None:
                    return ErrorDTO('Data not found', 404)
                if hasattr(self.model, 'status_id'):
                    flag_modified(data, 'status_id')
                await session.commit()
                await session.refresh(data)
                return SuccessDTO[self.model](data)
        except IntegrityError:
            return ErrorDTO('Data already exists', 400)
        except DBAPIError as e:
            print(e)
            return ErrorDTO('Database error', 500)
        
    async def delete(self, id: UUID) -> SuccessDTO[str] | ErrorDTO[str | int]:

        statement = (
                delete(self.model).where(self.model.id == id).returning(self.model)
            )
        try:
            async with SESSION() as session:
                data = (await session.execute(statement)).unique().scalar()
                if data is None:
                    return ErrorDTO('Data not found', 404)
                await session.commit()
                result = SuccessDTO('Entity success deleted')
                if data.__dict__.get('url', False):
                    result.set_url(data.__dict__.get('url'))
                return result
        except IntegrityError:
            return ErrorDTO('data is not exists', 400)
        except DBAPIError:
            return ErrorDTO('Database error', 500)
    def _ordering_statement(self, statement, order_colomn: str | None = None) -> Select:
        if order_colomn is None:
            return statement
        reverse = False
        if order_colomn.startswith('-'):
            reverse = True
            order_colomn = order_colomn[1:]
        if not hasattr(self.model, order_colomn):
            return statement
        attribute = getattr(self.model, order_colomn)
        return statement.order_by(attribute.desc() if reverse else attribute.asc())