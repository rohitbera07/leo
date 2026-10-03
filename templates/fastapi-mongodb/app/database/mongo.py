from pymongo import AsyncMongoClient
from app.core.config import settings
client = AsyncMongoClient(settings.mongodb_uri)
db = client[settings.mongodb_db]
