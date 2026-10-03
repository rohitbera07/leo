from fastapi import APIRouter
from sqlalchemy import text
from app.database.session import engine
router = APIRouter(prefix='/api/examples', tags=['examples'])
@router.get('/')
def examples():
    with engine.connect() as conn: return [dict(row) for row in conn.execute(text('SELECT NOW() AS now')).mappings()]
