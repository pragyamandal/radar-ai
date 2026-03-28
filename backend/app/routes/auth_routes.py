# Authentication routes for Radar AI

import logging
import hashlib
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.models.database import get_db, User, init_db

# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/auth", tags=["auth"])

# Initialize database on startup
init_db()


# Pydantic models
class RegisterRequest(BaseModel):
    email: str
    password: str
    risk_profile: str = "moderate"
    investment_horizon: str = "medium"


class LoginRequest(BaseModel):
    email: str
    password: str


class UpdateProfileRequest(BaseModel):
    risk_profile: str
    investment_horizon: str


# Helper functions
def hash_password(password: str) -> str:
    """
    Hash password using SHA256.
    
    Args:
        password: Plain text password
    
    Returns:
        Hashed password string
    """
    return hashlib.sha256(password.encode()).hexdigest()


# Endpoints
@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    """
    Register a new user.
    
    Args:
        request: RegisterRequest with email, password, risk_profile, investment_horizon
        db: Database session
    
    Returns:
        Success message with user_id
    """
    try:
        logger.info(f"Registration request for email: {request.email}")
        
        # Check if email already exists
        existing_user = db.query(User).filter(User.email == request.email).first()
        if existing_user:
            logger.warning(f"Registration failed: Email already registered - {request.email}")
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Hash password
        hashed_password = hash_password(request.password)
        
        # Create new user
        new_user = User(
            email=request.email,
            password=hashed_password,
            risk_profile=request.risk_profile,
            investment_horizon=request.investment_horizon
        )
        
        # Add to database
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        logger.info(f"User registered successfully: {request.email} (ID: {new_user.id})")
        
        return {
            "message": "User registered successfully",
            "user_id": new_user.id
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error registering user: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """
    User login endpoint.
    
    Args:
        request: LoginRequest with email and password
        db: Database session
    
    Returns:
        Success message with user_id, risk_profile, and investment_horizon
    """
    try:
        logger.info(f"Login request for email: {request.email}")
        
        # Find user by email
        user = db.query(User).filter(User.email == request.email).first()
        if not user:
            logger.warning(f"Login failed: User not found - {request.email}")
            raise HTTPException(status_code=404, detail="User not found")
        
        # Hash input password and compare
        hashed_password = hash_password(request.password)
        if hashed_password != user.password:
            logger.warning(f"Login failed: Invalid password for {request.email}")
            raise HTTPException(status_code=401, detail="Invalid password")
        
        logger.info(f"User logged in successfully: {request.email}")
        
        return {
            "message": "Login successful",
            "user_id": user.id,
            "risk_profile": user.risk_profile,
            "investment_horizon": user.investment_horizon
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error logging in user: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")


@router.get("/profile/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db)):
    """
    Get user profile.
    
    Args:
        user_id: User ID
        db: Database session
    
    Returns:
        User profile information
    """
    try:
        logger.info(f"Profile request for user_id: {user_id}")
        
        # Get user by id
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            logger.warning(f"Profile request failed: User not found - {user_id}")
            raise HTTPException(status_code=404, detail="User not found")
        
        logger.info(f"Profile retrieved for user_id: {user_id}")
        
        return {
            "user_id": user.id,
            "email": user.email,
            "risk_profile": user.risk_profile,
            "investment_horizon": user.investment_horizon,
            "created_at": user.created_at
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving profile: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Profile retrieval failed: {str(e)}")


@router.put("/profile/{user_id}")
def update_profile(user_id: int, request: UpdateProfileRequest, db: Session = Depends(get_db)):
    """
    Update user profile.
    
    Args:
        user_id: User ID
        request: UpdateProfileRequest with risk_profile and investment_horizon
        db: Database session
    
    Returns:
        Updated user profile
    """
    try:
        logger.info(f"Profile update request for user_id: {user_id}")
        
        # Get user by id
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            logger.warning(f"Profile update failed: User not found - {user_id}")
            raise HTTPException(status_code=404, detail="User not found")
        
        # Update profile
        user.risk_profile = request.risk_profile
        user.investment_horizon = request.investment_horizon
        
        db.commit()
        db.refresh(user)
        
        logger.info(f"Profile updated for user_id: {user_id}")
        
        return {
            "message": "Profile updated successfully",
            "user_id": user.id,
            "email": user.email,
            "risk_profile": user.risk_profile,
            "investment_horizon": user.investment_horizon,
            "created_at": user.created_at
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating profile: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Profile update failed: {str(e)}")
