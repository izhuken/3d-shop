from abc import ABC, abstractmethod


class IBaseRepository(ABC):
    
    @abstractmethod
    async def get_all():
        raise NotImplementedError
    
    @abstractmethod
    async def get_by_condition():
        raise NotImplementedError
    
    @abstractmethod
    async def create():
        raise NotImplementedError
    
    @abstractmethod
    async def update():
        raise NotImplementedError
    
    @abstractmethod
    async def delete():
        raise NotImplementedError