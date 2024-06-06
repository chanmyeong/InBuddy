from datetime import datetime, timedelta
from joblib import load
from app.predict import set_model

import uvicorn

from app.app import app
from logger.logger import log
from producer.producer import live_weather_producer, live_flight_producer, \
    batch_flight_producer, batch_weather_producer
from redis_manager.redis import redis
from scheduler.batch_produce import save
from scheduler.flight_data_fetcher import fetch as flight_fetch
from scheduler.flight_data_fetcher import \
    fetch_scheduled as flight_fetch_scheduled

from scheduler.scheduler import scheduler
from scheduler.weather_data_fetcher import fetch as weather_fetch
from scheduler.additional_data_fetcher import fetch as additional_data_fetch
from config import *

if __name__ == "__main__":
    redis.set_connection(REDIS_HOST, REDIS_PORT)

    servers = ','.join(
            [f"{KAFKA_HOST}:{PORT}" for PORT in KAFKA_BROKER_PORTS.split(',')])

    live_flight_producer.set_producer(servers=servers,
                                      client_id="live_data")
    live_weather_producer.set_producer(servers=servers,
                                       client_id="live_data")
    batch_flight_producer.set_producer(servers=servers,
                                       client_id="batch_data")
    batch_weather_producer.set_producer(servers=servers,
                                        client_id="batch_data")

    log.info("Starting scheduler")
    scheduler.create("flights_departure",
                     lambda: flight_fetch(datetime.today()),
                     trigger="cron",
                     minute='*/3', second=50)

    scheduler.create("flights_departure_scheduled",
                     lambda: flight_fetch_scheduled(datetime.now() + timedelta(
                             days=datetime.now().hour * FLIGHTS_FETCH_SIZE + 1)),
                     trigger="cron", hour="0-5", minute=0, second=30)

    scheduler.create("weather", lambda: weather_fetch(
            datetime.now().replace(second=0, microsecond=0)), trigger="cron",
                     minute='*',
                     second=45)

    scheduler.create("additional_data",
                     lambda: additional_data_fetch(datetime.now()),
                     trigger="cron",
                     minute='*/3', second=0)

    scheduler.create("batch_save",
                     lambda: save(datetime.today() - timedelta(days=2)),
                     trigger="cron", hour=0,
                     minute=0,
                     second=10)

    scheduler.start("flights_departure")
    scheduler.start("flights_departure_scheduled")
    scheduler.start("weather")
    scheduler.start("batch_save")
    scheduler.start("additional_data")

    log.info("Scheduler started")

    model = load(ML_MODEL_PATH)
    encoder = load(ENCODER_PATH)

    set_model(model, encoder)

    uvicorn.run(app, host=HOST, port=PORT, log_config=UVICORN_LOG_CONFIG)
