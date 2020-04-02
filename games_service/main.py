"""Flask Entrypoint.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from shared.kondo.flask import create_app

from .routes import GAMES

app = create_app(__name__, [GAMES])
