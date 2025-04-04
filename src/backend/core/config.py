from os import getenv as env

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = env("SECRET_KEY")
ALGORITHM = env("ALGORITHM")

SQLALCHEMY_DATABASE_URL = env("DB_LINK")

SECRET_KEY = env("SECRET_KEY")

MINIO_ACCESS_KEY = env("MINIO_ACCESS_KEY")
MINIO_SECRET_KEY = env("MINIO_SECRET_KEY")
S3_URL = env("S3_URL")
S3_BUCKET_NAME = env("S3_BUCKET_NAME")
