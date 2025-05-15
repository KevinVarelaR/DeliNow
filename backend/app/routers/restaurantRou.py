from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import favoriteMod, orderMod, restaurantMod
from app.schemas import restaurantSche

router = APIRouter()

# Dependency para obtener sesión de base de datos
def getDB():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET /restaurants/
@router.get("/all", response_model=list[restaurantSche.RestaurantOut])
def getRestaurants(db: Session = Depends(getDB)):
    return db.query(restaurantMod.Restaurant).order_by(restaurantMod.Restaurant.creationdate.desc()).all()

# GET /restaurants/most-ordered
@router.get("/most-ordered", response_model=list[restaurantSche.RestaurantOut])
def getMostOrdered(db: Session = Depends(getDB)):
    from sqlalchemy import func

    results = (
        db.query(restaurantMod.Restaurant)
        .join(orderMod.Order, restaurantMod.Restaurant.id == orderMod.Order.restaurantid)
        .group_by(restaurantMod.Restaurant.id)
        .order_by(func.count(orderMod.Order.id).desc())
        .limit(10)
        .all()
    )
    return results

# GET /restaurants/most-favorited
@router.get("/most-favorited", response_model=list[restaurantSche.RestaurantOut])
def getMostFavorited(db: Session = Depends(getDB)):
    results = (
        db.query(restaurantMod.Restaurant)
        .join(favoriteMod.Favorite, restaurantMod.Restaurant.id == favoriteMod.Favorite.restaurantid)
        .order_by(favoriteMod.Favorite.favoritedate.desc())
        .limit(10)
        .all()
    )
    return results

# GET /restaurants/{id}
@router.get("/by-id/{restaurantId}", response_model=restaurantSche.RestaurantOut)
def getRestaurant(restaurantId: int, db: Session = Depends(getDB)):
    restaurant = db.query(restaurantMod.Restaurant).filter_by(id=restaurantId).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return restaurant

# POST /restaurants/
@router.post("/", response_model=restaurantSche.RestaurantOut)
def createRestaurant(data: restaurantSche.RestaurantCreate, db: Session = Depends(getDB)):
    existing = db.query(restaurantMod.Restaurant).filter_by(name=data.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Restaurant with that name already exists")

    newRestaurant = restaurantMod.Restaurant(**data.dict())
    db.add(newRestaurant)
    db.commit()
    db.refresh(newRestaurant)
    return newRestaurant

# GET /restaurants/search?q=texto
@router.get("/search/", response_model=list[restaurantSche.RestaurantOut])
def searchRestaurants(q: str = Query(..., min_length=1), db: Session = Depends(getDB)):
    results = db.query(restaurantMod.Restaurant).filter(
        (restaurantMod.Restaurant.name.ilike(f"%{q}%")) |
        (restaurantMod.Restaurant.type.ilike(f"%{q}%"))
    ).order_by(restaurantMod.Restaurant.creationdate.desc()).all()

    return results