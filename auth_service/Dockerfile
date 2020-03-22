# This Dockerfile is meant to be built from the repo root!
FROM python:3

WORKDIR /usr/src/app

COPY auth_service ./auth_service
COPY shared ./shared

RUN pip install -r auth_service/requirements.txt

CMD ["/usr/local/bin/gunicorn", "auth_service.main:app", "-c", "./shared/gunicorn.py"]
