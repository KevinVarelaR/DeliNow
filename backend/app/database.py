from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

databaseURL = "postgresql://postgres:1234@localhost:5432/project2"

engine = create_engine(databaseURL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
