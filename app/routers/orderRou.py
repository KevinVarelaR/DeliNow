from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import orderSche
from app.models import restaurantMod, orderMod

router = APIRouter()

def getDB():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST /orders/
@router.post("/", response_model=orderSche.OrderOut)
def createOrder(order: orderSche.OrderCreate, db: Session = Depends(getDB)):
    restaurant = db.query(restaurantMod.Restaurant).filter_by(id=order.restaurantid).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    newOrder = orderMod.Order(**order.dict())
    db.add(newOrder)
    db.commit()
    db.refresh(newOrder)
    return newOrder

# GET /orders/{restaurantId}
@router.get("/{restaurantId}", response_model=list[orderSche.OrderOut])
def getOrdersByRestaurant(restaurantId: int, db: Session = Depends(getDB)):
    restaurant = db.query(restaurantMod.Restaurant).filter_by(id=restaurantId).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    return db.query(orderMod.Order).filter_by(restaurantid=restaurantId).order_by(orderMod.Order.creationdate.desc()).all()
