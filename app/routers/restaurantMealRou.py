from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import restaurantMod, restaurantMealMod
from app.schemas import restaurantMealSche

router = APIRouter()

def getDB():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET /meals/{restaurantId}
@router.get("/{restaurantId}", response_model=list[restaurantMealSche.MealOut])
def getMealsByRestaurant(restaurantId: int, db: Session = Depends(getDB)):
    restaurant = db.query(restaurantMod.Restaurant).filter_by(id=restaurantId).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    meals = db.query(restaurantMealMod.RestaurantMeal).filter_by(restaurantid=restaurantId).all()
    return meals

@router.post("/", response_model=restaurantMealSche.MealOut)
def createMeal(meal: restaurantMealSche.MealCreate, db: Session = Depends(getDB)):
    restaurant = db.query(restaurantMod.Restaurant).filter_by(id=meal.restaurantid).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    
    newMeal = restaurantMealMod.RestaurantMeal(**meal.dict())
    db.add(newMeal)
    db.commit()
    db.refresh(newMeal)
    return newMeal
