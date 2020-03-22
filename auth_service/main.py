"""Flask Entrypoint.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
from flask import Flask

from .discord_auth import AUTH

app = Flask(__name__)
app.register_blueprint(AUTH, url_prefix="/auth/discord")
