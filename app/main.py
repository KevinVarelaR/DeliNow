import nest_asyncio

from app.routers import orderMealRou, orderRou, restaurantMealRou, restaurantRou, favoriteRou
nest_asyncio.apply()
from fastapi import FastAPI
from app.database import Base, engine
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DeliNow API", version="1.0")

app.include_router(restaurantRou.router, prefix="/restaurants", tags=["Restaurants"])
app.include_router(favoriteRou.router, prefix="/favorites", tags=["Favorites"])
app.include_router(restaurantMealRou.router, prefix="/restaurant-meals", tags=["Restaurant Meals"])
app.include_router(orderRou.router, prefix="/orders", tags=["Orders"])
app.include_router(orderMealRou.router, prefix="/order-meals", tags=["Order Meals"])
