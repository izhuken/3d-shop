from os import getenv as env

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = env("SECRET_KEY")
ALGORITHM = env("ALGORITHM")

MONGO_HOST = env("MONGO_HOST")
MONGO_PORT = int(env("MONGO_PORT"))
MONGO_USER = env("MONGO_USER")
MONGO_PASS = env("MONGO_PASS")
MONGO_DB = env("MONGO_DB")

SECRET_KEY = env("SECRET_KEY")

MINIO_ACCESS_KEY = env("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = env("MINIO_SECRET_KEY")

KAFKA_URL = env("KAFKA_URL")
TOPIC_PLAY = env("PLAY_TOPIC")
S3_URL = env("S3_URL")
S3_BUCKET_NAME = env("S3_BUCKET_NAME")
