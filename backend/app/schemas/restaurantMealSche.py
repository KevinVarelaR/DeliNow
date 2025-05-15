from typing import Annotated, Optional
from pydantic import BaseModel, Field, constr, condecimal

class MealBase(BaseModel):
    name: Annotated[str, constr(min_length=1, max_length=150, pattern=r'^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$')]
    thumbnailpath: Optional[str] = None
    price: Annotated[float, condecimal(ge=0, max_digits=9, decimal_places=2)]

class MealCreate(MealBase):
    restaurantid: int

class MealOut(MealBase):
    id: int
    restaurantid: int

    class Config:
        from_attributes = True
