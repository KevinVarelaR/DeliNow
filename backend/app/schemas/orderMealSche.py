from typing import Annotated
from pydantic import BaseModel, conint

class OrderMealCreate(BaseModel):
    orderid: int
    mealid: int
    amount: Annotated[int, conint(ge=1, le=10)]

class OrderMealOut(OrderMealCreate):
    id: int

    class Config:
        from_attributes = True
