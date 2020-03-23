"""Flask Entrypoint.

Pylint Disables:
    invalid-name - allow "app" to exist for flask usage
"""
# pylint: disable=invalid-name
from flask import Flask
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix

from shared.kondo.health import HEALTH
from shared.kondo.metrics import wrap_with_prometheus

from .discord_auth import AUTH

app = Flask(__name__)
CORS(app)
app.register_blueprint(AUTH, url_prefix="/auth/discord")
app.register_blueprint(HEALTH, url_prefix="/auth/_health")

# Allow the following headers our proxy sets
# * X-Forwarded-Proto
# * X-Forwarded-Host
# * X-Forwarded-For
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1, x_for=1)

# Add prometheus /metrics endpoint
app = wrap_with_prometheus(app)
