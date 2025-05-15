from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas import orderMealSche
from app.models import orderMealMod, restaurantMealMod, orderMod

router = APIRouter()

def getDB():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# POST /order-meals/
@router.post("/", response_model=orderMealSche.OrderMealOut)
def addMealToOrder(data: orderMealSche.OrderMealCreate, db: Session = Depends(getDB)):
    order = db.query(orderMod.Order).filter_by(id=data.orderid).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    meal = db.query(restaurantMealMod.RestaurantMeal).filter_by(id=data.mealid).first()
    if not meal:
        raise HTTPException(status_code=404, detail="Meal not found")

    existingOrderMeal = db.query(orderMealMod.OrderMeal).filter_by(orderid=data.orderid, mealid=data.mealid).first()

    if existingOrderMeal:
        existingOrderMeal.amount += data.amount
        db.commit()
        db.refresh(existingOrderMeal)
        return existingOrderMeal
    else:
        orderMeal = orderMealMod.OrderMeal(
            orderid=data.orderid,
            mealid=data.mealid,
            amount=data.amount
        )
        db.add(orderMeal)
        db.commit()
        db.refresh(orderMeal)
        return orderMeal
    
    
