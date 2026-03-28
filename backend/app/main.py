from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.radar_routes import router as radar_router
from app.routes.coach_routes import router as coach_router

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

@app.get("/")
def root():
    return {"message": "Radar backend running"}