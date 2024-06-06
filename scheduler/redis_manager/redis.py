import redis as _redis


class RedisManager:
    _instance = None
    FLIGHTS_API = 0
    WEATHERS_API = 1
    FLIGHTS_BATCH = 2
    WEATHERS_BATCH = 3
    SCHEDULED_FLIGHTS_API = 4

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.redis_connection = None
        return cls._instance

    def set_connection(self, host, port):
        self._instance.redis_connection = _redis.StrictRedis(host=host,
                                                             port=port)

    def select(self, db):
        self.redis_connection.select(db)

    def get(self, key):
        return self.redis_connection.get(key)

    def set(self, key, value):
        self.redis_connection.set(key, value)

    def delete(self, key):
        self.redis_connection.delete(key)

    def delete_many(self, *args):
        if args is not None and len(args) > 0:
            self.redis_connection.delete(*args)


redis = RedisManager()
