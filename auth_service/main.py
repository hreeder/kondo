"""Flask Entrypoint.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
from pprint import pprint

from flask import Flask, request

from .discord_auth import AUTH

app = Flask(__name__)
app.register_blueprint(AUTH, url_prefix="/auth/discord")


@app.before_request
def print_headers():
    pprint(dict(request.headers))
