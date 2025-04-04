from minio import Minio

from .config import MINIO_ACCESS_KEY, MINIO_SECRET_KEY, S3_BUCKET_NAME, S3_URL

minio_client = Minio(
    S3_URL,
    access_key=MINIO_ACCESS_KEY,
    secret_key=MINIO_SECRET_KEY,
    secure=True,
)

if not minio_client.bucket_exists(S3_BUCKET_NAME):
    minio_client.make_bucket(S3_BUCKET_NAME)