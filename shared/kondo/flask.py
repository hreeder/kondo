"""Flask app constructor."""
from functools import wraps

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix

from shared.kondo.health import HEALTH
from shared.kondo.metrics import wrap_with_prometheus


def create_app(name, blueprints, config=None, extensions=None):
    app = Flask(name)

    if config:
        app.config.update(config)

    # Default extensions
    cors = CORS()

    default_extensions = [cors]

    if not instance(extensions, list):
        extensions = []

    extensions = default_extensions + extensions
    for extension in extensions:
        extension.init_app(app)

    blueprints.append(HEALTH)

    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    # Allow the following headers our proxy sets
    # * X-Forwarded-Proto
    # * X-Forwarded-Host
    # * X-Forwarded-For
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1, x_for=1)

    # Add prometheus /metrics endpoint
    app = wrap_with_prometheus(app)

    return app


def header_required(header, status="bad-request", message=None, code=400):
    def decorator(func):
        @wraps(func)
        def decorated_function(*args, **kwargs):
            desired_header = request.headers.get(header)
            if not desired_header:
                return (
                    jsonify(
                        status=status,
                        message=message or f"No {header} header in request",
                    ),
                    code,
                )
            return func(*args, **kwargs)

        return decorated_function

    return decorator
