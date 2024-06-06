import datetime
import json

from redis_manager.redis import redis
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from app.models import PredictRequestEntity, PredictResponseEntity, \
    APIResponseEntity
from app.predict import predict
from config import resource_lock

app = FastAPI()


@app.get("/")
async def root():
    return JSONResponse(content={"message": "Hello World"},
                        status_code=status.HTTP_200_OK)


@app.get("/api/flights/{flight_code}")
def flights(flight_code):
    today = (datetime.datetime.today().strftime('%Y%m%d'))

    with resource_lock:
        redis.select(redis.FLIGHTS_API)
        document = json.loads(redis.get(today + 'D'))

    http_status, message, data = 400, "불러오기 실패", None

    if flight_code and flight_code in document:
        http_status, message, data = 200, "불러오기 성공", document[flight_code]

    return APIResponseEntity(status=http_status, message=message, data=data)


@app.post("/api/predict")
def delay_predict(flight_info: PredictRequestEntity):
    flight_code = flight_info.flight_code

    result = predict(flight_code)

    http_status, message, data = 200, "예측 성공", result

    if result is None:
        http_status, message, data = 400, "예측 실패", None

    return PredictResponseEntity(status=http_status, message=message, data=data)
