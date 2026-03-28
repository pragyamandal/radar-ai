from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.radar_routes import router as radar_router
from app.routes.coach_routes import router as coach_router
from app.routes.auth_routes import router as auth_router
from app.routes.holding_routes import router as holdings_router
from app.models.database import init_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(radar_router)
app.include_router(coach_router)
app.include_router(auth_router)
app.include_router(holdings_router)

# Initialize database on startup
@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def root():
    return {"message": "Radar backend running"}