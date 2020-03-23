"""Flask Entrypoint.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
from shared.kondo.flask import create_app

from .discord_auth import AUTH

app = create_app([(AUTH, "/auth/discord")])
