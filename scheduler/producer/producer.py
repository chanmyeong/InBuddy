from confluent_kafka import Producer

from producer.ack import ack


class KafkaProducer:

    def __init__(self):
        self.producer = None

    def set_producer(self, servers, client_id, config=None):
        if config is None:
            config = {}
        if servers is not None:
            config['bootstrap.servers'] = servers
        if client_id is not None:
            config['client.id'] = client_id

        self.producer = Producer(**config)

    def produce(self, topic, value=None, key=None, **kwargs):
        self.producer.produce(topic, value=value, key=key, callback=ack,
                              **kwargs)
        self.producer.flush()


live_flight_producer = KafkaProducer()
live_weather_producer = KafkaProducer()
batch_flight_producer = KafkaProducer()
batch_weather_producer = KafkaProducer()
