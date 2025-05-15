from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Favorite(Base):
    __tablename__ = "favorite"

    id = Column(Integer, primary_key=True, index=True)
    restaurantid = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), unique=True, nullable=False)
    favoritedate = Column(DateTime(timezone=True), server_default=func.now())
