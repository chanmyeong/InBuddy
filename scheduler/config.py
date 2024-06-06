import os
from dotenv import load_dotenv
from threading import Lock

load_dotenv()

# Host
HOST = str(os.getenv("HOST"))
PORT = int(os.getenv("PORT"))

# Resource Lock
resource_lock = Lock()

# Directory
PROJECT_ROOT = os.path.dirname(__file__)
LOG_DIRECTORY = os.path.join(PROJECT_ROOT, 'log')
if not os.path.exists(LOG_DIRECTORY):
    os.makedirs(LOG_DIRECTORY)

LOGFILE_PATH = os.path.join(LOG_DIRECTORY, 'scheduler.log')

# Flight API
FLIGHT_API_URL = "https://www.airportal.go.kr/life/airinfo/RbHanList.jsp"
# FLIGHT_DATA_COLUMNS = ["날짜", "항공사", "편명", "도착지", "계획", "예상", "출발", "구분", "현황",
#                        "사유"]
FLIGHT_DATA_COLUMNS = ['departure_date', 'airline', 'flight_code',
                       'destination', 'departure_time_plan',
                       'departure_time_expected', 'departure_time_real',
                       'division', 'flight_status', 'cause']
FLIGHTS_FETCH_SIZE = int(os.getenv("FLIGHTS_FETCH_SIZE"))

# Weather API
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
WEATHER_API_URL = "https://apihub.kma.go.kr/api/typ01/url/amos.php"
WEATHER_DATA_COLUMNS = ["S", "TM", "L_VIS", "R_VIS", "L_RVR", "R_RVR", "CH_MIN",
                        "TA", "TD",
                        "HM", "PS", "PA", "RN", "예비1", "예비2", "WD02",
                        "WD02_MAX", "WD02_MIN",
                        "WS02", "WS02_MAX", "WS02_MIN", "WD10", "WD10_MAX",
                        "WD10_MIN",
                        "WS10", "WS10_MAX", "WS10_MIN"]

# SubWeather API
ADDITIONAL_DATA_API_KEY = os.getenv("ADDITIONAL_DATA_API_KEY")
ADDITIONAL_DATA_API_URL = "http://apis.data.go.kr/B551177/StatusOfPassengerWorldWeatherInfo/getPassengerArrivalsWorldWeather"

# Database
REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

# Message Broker
KAFKA_HOST = os.getenv("KAFKA_HOST")
KAFKA_BROKER_PORTS = os.getenv("KAFKA_BROKER_PORTS")

# Topic
LIVE_FLIGHT_TOPIC = os.getenv("LIVE_FLIGHT_TOPIC")
LIVE_WEATHER_TOPIC = os.getenv("LIVE_WEATHER_TOPIC")
BATCH_FLIGHT_TOPIC = os.getenv("BATCH_FLIGHT_TOPIC")
BATCH_WEATHER_TOPIC = os.getenv("BATCH_WEATHER_TOPIC")

# Logger
LOG_FORMAT = "%(log_color)s%(asctime)s - %(levelname)-5s - %(message)s"
LOG_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"
LOG_COLORS = {
    'DEBUG': 'cyan',
    'INFO': 'white',
    'WARNING': 'yellow',
    'ERROR': 'red',
    'CRITICAL': 'red,bg_white',
}

UVICORN_LOG_CONFIG = {
    "version": 1,
    "formatters": {
        "default": {
            "()": "colorlog.ColoredFormatter",
            "format": LOG_FORMAT,
            "datefmt": LOG_DATE_FORMAT,
            "log_colors": LOG_COLORS,
        },
        "simple": {
            "format": LOG_FORMAT.replace('%(log_color)s', '').replace(
                    '%(reset)s', ''),
            "datefmt": LOG_DATE_FORMAT
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stdout",
        },
        "file": {
            "class": "logging.FileHandler",
            "formatter": "simple",
            "filename": LOGFILE_PATH,
        },
    },
    "loggers": {
        "uvicorn.error": {"handlers": ["default", "file"], "level": "INFO"},
        "uvicorn.access": {"handlers": ["default", "file"], "level": "INFO"},
        "inbuddy.scheduler": {"handlers": ["default", "file"],
                              "level": "DEBUG"},
    },
}

# Predict Model Path
ML_MODEL_PATH = os.getenv('ML_MODEL_PATH')
ENCODER_PATH = os.getenv('ENCODER_PATH')

INPUT_COLUMNS = [
    'airline',
    'flight_code',
    'destination',
    'cause',
    'temperature',
    'wind_speed_10m_avg_kt',
    'cumulative_precipitation_mm',
    'mor_10m_avg_km',
    'term',
]
