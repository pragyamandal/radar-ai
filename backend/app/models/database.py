# SQLAlchemy database setup for Radar AI

from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

# Database configuration
DATABASE_URL = "sqlite:///./radar.db"

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create declarative base
Base = declarative_base()


# Models
class User(Base):
    """User model for storing user information."""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    risk_profile = Column(String, default="moderate")
    investment_horizon = Column(String, default="medium")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    holdings = relationship("UserHoldings", back_populates="user", cascade="all, delete-orphan")
    trade_history = relationship("TradeHistory", back_populates="user", cascade="all, delete-orphan")


class UserHoldings(Base):
    """Model for tracking user stock holdings."""
    __tablename__ = "user_holdings"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    ticker = Column(String, nullable=False, index=True)
    quantity = Column(Float, nullable=False)
    buy_price = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="holdings")


class TradeHistory(Base):
    """Model for tracking user trading history."""
    __tablename__ = "trade_history"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    ticker = Column(String, nullable=False, index=True)
    action = Column(String, nullable=False)  # BUY or SELL
    price_change_at_buy = Column(Float, nullable=False)
    days_held = Column(Integer, nullable=False)
    return_pct = Column(Float, nullable=False)
    portfolio_pct = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    user = relationship("User", back_populates="trade_history")


# Database session dependency
def get_db():
    """
    Dependency to get database session.
    
    Yields:
        Database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Initialize database
def init_db():
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)
