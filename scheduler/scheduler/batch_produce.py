import json
from datetime import datetime, timedelta

from logger.logger import log
from producer.producer import batch_flight_producer, batch_weather_producer
from redis_manager.redis import redis
from config import resource_lock, BATCH_FLIGHT_TOPIC, BATCH_WEATHER_TOPIC

_DATE_FORMAT = "%Y%m%d"
_DATE_FORMAT_MINUTE = "%Y%m%d%H%M"


def flight_save(old_flight_date):
    old_flight_data_key = old_flight_date.strftime(_DATE_FORMAT) + 'D'

    with resource_lock:
        redis.select(redis.FLIGHTS_API)
        old_flight_data = redis.get(old_flight_data_key)
        redis.delete(old_flight_data_key)

    log.info(f"Old Flight Data: {old_flight_data_key} Deleted From Redis")

    old_flight_data = {} if old_flight_data is None else json.loads(
            old_flight_data)

    old_flight_csv_data = ""
    for document in old_flight_data:
        old_flight_csv_data += ','.join(list(document.values())) + '\n'

    batch_flight_producer.produce(topic=BATCH_FLIGHT_TOPIC,
                                  value=old_flight_csv_data,
                                  key=old_flight_data_key)


def weather_save(old_weather_date):
    old_weather_date = datetime.combine(old_weather_date,
                                        datetime.min.time())

    date = old_weather_date
    end_date = old_weather_date + timedelta(days=1)

    old_weather_data_key = old_weather_date.strftime(_DATE_FORMAT)
    old_weather_data = []

    with resource_lock:
        redis.select(redis.WEATHERS_BATCH)

    while date < end_date:
        data_key = date.strftime(_DATE_FORMAT_MINUTE)

        with resource_lock:
            data = redis.get(data_key)
            redis.delete(data_key)

        if data is not None:
            data = data.decode("utf-8")
            old_weather_data.append(data)

        date += timedelta(minutes=1)

    log.info(f"Old Weather Data: {old_weather_data_key} Deleted From Redis")

    if old_weather_data:
        batch_weather_producer.produce(topic=BATCH_WEATHER_TOPIC,
                                       value='\n'.join(
                                               old_weather_data).encode(),
                                       key=old_weather_data_key)


def save(old_date):
    flight_save(old_date)
    weather_save(old_date)
