from fastapi import APIRouter
from app.database.mongo import db
router = APIRouter(prefix='/api/examples', tags=['examples'])
@router.get('/')
async def examples(): return await db.example.find().to_list(100)
