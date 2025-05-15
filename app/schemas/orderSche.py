from pydantic import BaseModel, condecimal
from typing import Annotated
from datetime import datetime

Decimal9_2 = Annotated[float, condecimal(ge=0, max_digits=9, decimal_places=2)]

class OrderCreate(BaseModel):
    restaurantid: int
    subtotal: Decimal9_2

class OrderOut(BaseModel):
    id: int
    restaurantid: int
    creationdate: datetime
    subtotal: Decimal9_2
    tax: Decimal9_2
    shippingcost: Decimal9_2
    servicecost: Decimal9_2
    total: Decimal9_2

    class Config:
        from_attributes = True
