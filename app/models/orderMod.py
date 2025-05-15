from sqlalchemy import Column, Integer, ForeignKey, Numeric, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    restaurantid = Column(Integer, ForeignKey("restaurants.id", ondelete="CASCADE"), nullable=False)
    creationdate = Column(DateTime(timezone=True), server_default=func.now())
    subtotal = Column(Numeric(9, 2), nullable=False)
    tax = Column(Numeric(9, 2), nullable=False)
    shippingcost = Column(Numeric(9, 2), nullable=False)
    servicecost = Column(Numeric(9, 2), nullable=False)
    total = Column(Numeric(9, 2), nullable=False)
