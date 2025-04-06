from os import getenv as env

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = env("SECRET_KEY")
ALGORITHM = env("ALGORITHM")

KAFKA_URL = env("KAFKA_URL")
TOPIC_PLAY = env("PLAY_TOPIC")

MONGO_HOST = env("MONGO_HOST")
MONGO_PORT = int(env("MONGO_PORT"))
MONGO_USER = env("MONGO_USER")
MONGO_PASS = env("MONGO_PASS")
MONGO_DB = env("MONGO_DB")
