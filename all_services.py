"""All Services in one Flask App.

This provides a handy entrypoint for local debugging.
This is not used in production.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
from auth_service.discord_auth import AUTH
from games_service.routes import GAMES
from shared.kondo.flask import create_app

app = create_app(__name__, [AUTH, GAMES])
