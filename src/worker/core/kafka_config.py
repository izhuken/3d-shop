from os import getenv as env

from confluent_kafka import Consumer
from dotenv import load_dotenv

load_dotenv()

config = {
    "bootstrap.servers": env("KAFKA_URL"),
    "group.id": "mygroup",
    "auto.offset.reset": "earliest",
}

consumer = Consumer(config)


PLAY_TOPIC = env("PLAY_TOPIC")