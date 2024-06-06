from typing import Optional

from pydantic import BaseModel


class PredictRequestEntity(BaseModel):
    flight_code: str


class PredictResponseEntity(BaseModel):
    status: int
    message: str
    data: Optional[int] = None


class APIResponseEntity(BaseModel):
    status: int
    message: str
    data: Optional[dict] = None
