import json
import requests

from logger.logger import log
from redis_manager.redis import redis
from config import ADDITIONAL_DATA_API_KEY, ADDITIONAL_DATA_API_URL, \
    resource_lock

_DATE_FORMAT_MINUTE = "%Y%m%d%H%M"
_TIME_FORMAT = "%H%M"
_DATE_FORMAT = "%Y%m%d"
KEYS = ['gatenumber', 'chkinrange', 'himidity', 'wimage', 'wind', 'temp',
        'senstemp', 'terminalid']


def _request(now):
    params = {"serviceKey": ADDITIONAL_DATA_API_KEY, "numOfRows": 1000,
              "pageNo": 1, "from_time": now.strftime(_TIME_FORMAT),
              "type": "json"}

    url = ADDITIONAL_DATA_API_URL + '?' + '&'.join(
            [f"{key}={value}" for key, value in params.items()])

    response = requests.get(url)

    if response.status_code != 200:
        return None

    log.info("Fetched Additional Data")

    items = json.loads(response.content)['response']['body']['items']

    return items


def fetch(now):
    response = _request(now)

    today_date_format = now.strftime(_DATE_FORMAT)

    with resource_lock:
        redis.select(redis.FLIGHTS_API)
        flight_data = json.loads(redis.get(today_date_format + 'D'))

    for document in response:
        flight_code = document['flightId']
        if flight_code not in flight_data:
            continue

        flight_data[flight_code] = {key: document[key] for key in KEYS}

    with resource_lock:
        redis.select(redis.FLIGHTS_API)
        redis.set(today_date_format + 'D', json.dumps(flight_data))

    log.info("Added Additional Data to Flight(Departure) Data")
