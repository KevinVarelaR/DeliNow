from sqlalchemy import Column, Integer, String, Text, Numeric, ForeignKey, UniqueConstraint
from app.database import Base

class RestaurantMeal(Base):
    __tablename__ = "restaurantmeals"

    id = Column(Integer, primary_key=True, index=True)
    restaurantid = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(150), nullable=False)
    thumbnailpath = Column(Text)
    price = Column(Numeric(10, 2), nullable=False)

    __table_args__ = (
            UniqueConstraint("restaurantid", "name", name="uix_restaurant_meal"),
        )