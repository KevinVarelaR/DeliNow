from typing import Annotated
from pydantic import BaseModel, constr, Field
from datetime import datetime

class RestaurantBase(BaseModel):
    name: Annotated[str, constr(min_length=1, max_length=100, pattern=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')]
    type: str
    thumbnailpath: str | None = None

class RestaurantCreate(RestaurantBase):
    pass

class RestaurantOut(RestaurantBase):
    id: int
    creationdate: datetime

    class Config:
        from_attributes = True
