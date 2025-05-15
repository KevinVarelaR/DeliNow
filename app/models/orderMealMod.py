from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base

class OrderMeal(Base):
    __tablename__ = "ordermeals"

    id = Column(Integer, primary_key=True, index=True)
    orderid = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    mealid = Column(Integer, ForeignKey("restaurantmeals.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Integer, nullable=False)
