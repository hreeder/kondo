"""All Services in one Flask App.

This provides a handy entrypoint for local debugging.
This is not used in production.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
from flask import Flask

from auth_service.discord_auth import AUTH

app = Flask(__name__)
app.register_blueprint(AUTH, url_prefix="/api/auth/discord")
