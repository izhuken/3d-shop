from os import fstat
from urllib.parse import unquote

from core.s3_config import S3_BUCKET_NAME, S3_URL, minio_client
from fastapi import Request
from minio.error import S3Error

from app.schemas.response import ErrorResponse


class BaseFileService:
    _bucket_name = S3_BUCKET_NAME
    _minio_host = S3_URL
    _minio_client = minio_client

    async def remove_file_from_s3(self, url) -> None:
        part_of_path = url.split("/")
        try:
            self._minio_client.remove_object(part_of_path[3], unquote(part_of_path[4]))
        except S3Error as e:
            return ErrorResponse(detail={"error": str(e)})

    async def upload_file_to_s3(self, file, request: Request) -> str | ErrorResponse:
        try:
            result = self._minio_client.put_object(
                self._bucket_name,
                file.filename,
                file.file,
                fstat(file.file.fileno()).st_size,
            )
            print(result)
            result = await self._create_path_file(result, request)
        except Exception as e:
            return ErrorResponse(detail=str(e), status_code=400)

        return result
    async def upload_file_to_s3_for_builder(self, filename, file, request):
        try:
            result = self._minio_client.put_object(
                self._bucket_name,
                filename,
                file,
                fstat(file.fileno()).st_size,
            )
            result = await self._create_path_file(result, request)
        except Exception as e:
            return ErrorResponse(detail=str(e), status_code=400)
        return result

    async def _create_path_file(self, file, request: Request) -> str | ErrorResponse:
        try:
            response_file = self._minio_client.get_object(
                file._bucket_name, file.__dict__.get("_object_name")
            )
            print(response_file.__dict__)
            files_path = f"{request.url.scheme}s://{self._minio_host}{response_file.__dict__.get('_request_url')}"
        except S3Error as e:
            return ErrorResponse(detail=str(e), status_code=404)
        return files_path