# GET UV stage
FROM python:3.12-alpine AS get-uv

RUN apk add curl
RUN curl -LsSf https://astral.sh/uv/install.sh | sh

# Build stage
FROM python:3.12.1-slim-bullseye AS build-deps

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt update -y && apt install -y gcc python3-dev musl-dev

COPY --from=get-uv /root/.local/bin/uv /bin/uv

COPY ./pyproject.toml /app/pyproject.toml
COPY ./.python-version /app/.python-version
COPY ./uv.lock /app/uv.lock

RUN uv export \
    --format requirements-txt \
    --output-file /app/requirements.txt


RUN pip install --no-cache-dir wheel
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Runtime
FROM python:3.12.1-slim-bullseye AS runtime

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt update -y && apt install -y libpq-dev

RUN --mount=type=bind,from=build-deps,source=/app/wheels,target=/wheels pip install \
    --no-cache-dir \
    --no-index \
    --no-cache \ 
    --no-deps \
    --find-links=/wheels /wheels/*

COPY ./ ./

RUN rm -rf /wheels

ENTRYPOINT [ "python", "main.py" ]