from pydantic import BaseModel
from datetime import datetime

class FavoriteCreate(BaseModel):
    restaurantid: int

class FavoriteOut(BaseModel):
    id: int
    restaurantid: int
    favoritedate: datetime

    class Config:
        from_attributes = True
