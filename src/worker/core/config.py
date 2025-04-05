from os import getenv as env

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = env("SECRET_KEY")
ALGORITHM = env("ALGORITHM")

MONGODB_URL = env("DB_LINK")

KAFKA_URL = env("KAFKA_URL")
TOPIC_PLAY = env("PLAY_TOPIC")
