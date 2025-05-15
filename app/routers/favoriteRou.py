from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import restaurantMod, favoriteMod

router = APIRouter()

def getDB():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# PUT /favorites/{restaurantId}
@router.put("/{restaurantId}")
def addToFavorites(restaurantId: int, db: Session = Depends(getDB)):
    restaurant = db.query(restaurantMod.Restaurant).filter_by(id=restaurantId).first()
    if not restaurant:
        raise HTTPException(status_code=404, detail="Restaurant not found")

    alreadyFavorite = db.query(favoriteMod.Favorite).filter_by(restaurantid=restaurantId).first()
    if alreadyFavorite:
        raise HTTPException(status_code=400, detail="Restaurant is already in favorites")

    newFavorite = favoriteMod.Favorite(restaurantid=restaurantId)
    db.add(newFavorite)
    db.commit()
    return {"message": "Restaurant added to favorites"}

# DELETE /favorites/{restaurantId}
@router.delete("/{restaurantId}")
def removeFromFavorites(restaurantId: int, db: Session = Depends(getDB)):
    favorite = db.query(favoriteMod.Favorite).filter_by(restaurantid=restaurantId).first()
    if not favorite:
        raise HTTPException(status_code=404, detail="Restaurant is not in favorites")

    db.delete(favorite)
    db.commit()
    return {"message": "Restaurant removed from favorites"}
