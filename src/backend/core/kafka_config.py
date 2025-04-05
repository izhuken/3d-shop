from confluent_kafka import Producer
from dotenv import load_dotenv

from .config import KAFKA_URL

load_dotenv()
config = {
    "bootstrap.servers": KAFKA_URL,
    "acks": "all",
}
TOPIC_CREATE_USER = "user"
TOPIC_ACCEPT_REPORT = "report"
TOPIC_DATABASE_UPLOAD = "user"

producer = Producer(config)