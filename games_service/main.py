"""Flask Entrypoint.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
import os

from shared.kondo.flask import create_app

from . import tasks

from .extensions import db, migrate
from .routes import GAMES


def get_postgres_url():
    with open(os.environ["GAMES_DB_USER_FILE"]) as user_file:
        username = user_file.read()

    with open(os.environ["GAMES_DB_PASSWORD_FILE"]) as password_file:
        password = password_file.read()

    hostname = os.environ["GAMES_DB_HOST"]
    database = os.environ["GAMES_DB_NAME"]

    return f"postgresql://{username}:{password}@{hostname}/{database}"


app = create_app(
    name=__name__,
    blueprints=[GAMES],
    config={
        "SQLALCHEMY_DATABASE_URI": get_postgres_url(),
        "SQLALCHEMY_TRACK_MODIFICATIONS": False,
    },
    extensions=[db],
    migrate=(migrate, db),
)
