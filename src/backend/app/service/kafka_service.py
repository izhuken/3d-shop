from core.kafka_config import producer


class KafkaService():
    _producer = producer
    def produce(self, value, key, topic):
        self._producer.produce(topic=topic, key=key, value=value, on_delivery=self.__delivery_callback)
        self._producer.flush()
        self._producer.poll(1)

    @staticmethod
    def __delivery_callback(err, msg):
        if err:
            print(f"Error: Message failed delivery: {err}")
        else:
            print(f"Produced event to topic {msg.topic()}: key = {msg.key()}, value = {msg.value().decode('utf-8')}")