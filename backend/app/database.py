from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

databaseURL = "postgresql://postgres:OzDbKfdbwBTNYhaqvvzhvryfZZsYpSEf@yamanote.proxy.rlwy.net:27184/railway"

engine = create_engine(databaseURL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
