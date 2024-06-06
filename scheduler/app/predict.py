from logger.logger import log
import json
from datetime import datetime
import pandas as pd

from redis_manager.redis import redis
from scheduler.weather_data_fetcher import get_last_received_time

global model, encoder
encoded_columns = None

_DATE_FORMAT = "%Y%m%d"
_DATE_FORMAT_MINUTE = "%Y%m%d%H%M"
COLUMNS = ['airline',
           'flight_code',
           'destination',
           'cause',
           'delay_minute',
           'temperature',
           'wind_speed_10m_avg_kt',
           'term']


def set_model(_model, _encoder):
    global model, encoder
    model = _model
    encoder = _encoder
    log.info("ML Model set")


def _normalize_date(now):
    year = now.year
    month = now.month
    day = now.day
    is_leap_year = now.is_leap_year

    month_days = [0, 31, 29 if is_leap_year else 28, 31, 30, 31, 30, 31, 31,
                  30,
                  31, 30, 31]

    cumulative_days = sum(month_days[:month]) + day

    max_days = 366 if is_leap_year else 365

    normalized = (cumulative_days - 1) / (
            max_days - 1)  # 1월 1일은 0으로, 12월 31일은 1로 정규화
    return normalized * 10


def predict(flight_code):
    global encoded_columns

    if flight_code is None or len(flight_code) == 0:
        return None

    redis.select(redis.FLIGHTS_API)
    flights_data = json.loads(redis.get(
            datetime.strftime(datetime.today(), _DATE_FORMAT) + 'D'))
    flight_data = flights_data[flight_code]

    if flight_data is None:
        return None

    redis.select(redis.WEATHERS_API)
    last_received_time = get_last_received_time()

    if last_received_time is None:
        return None

    weather_data = json.loads(
            redis.get(
                    datetime.strftime(last_received_time, _DATE_FORMAT_MINUTE)))

    if weather_data is None:
        return None

    df = pd.DataFrame(columns=COLUMNS)

    data = {
        'airline': flight_data['flight_code'][:2],
        'flight_code': flight_data['flight_code'],
        'destination': flight_data['destination'][:3],
        'cause': '기타' if flight_data['cause'] == '' else flight_data['cause'],
        'delay_minute': None,
        'temperature': weather_data['TA'] / 10,
        'wind_speed_10m_avg_kt': weather_data['WS10'] * 0.194384,
        'term': _normalize_date(
                pd.to_datetime(flight_data['departure_date'] + flight_data[
                    'departure_time_plan'],
                               format="%Y%m%d%H:%M"))
    }

    df.loc[0] = data

    categorical_features = [
        'airline',
        'flight_code',
        'destination',
        'cause']
    numeric_features = [col for col in df.columns if
                        col not in categorical_features]

    encoded_data = encoder.transform(df)
    encoded_df = pd.DataFrame(encoded_data.toarray())

    new_column_names = encoder.named_transformers_[
        'encoder'].get_feature_names_out(
            input_features=categorical_features)
    all_column_names = list(new_column_names) + list(numeric_features)
    encoded_df.columns = all_column_names

    encoded_df.drop('delay_minute', axis=1, inplace=True)

    y_pred = model.predict(encoded_df)

    return int(y_pred)
