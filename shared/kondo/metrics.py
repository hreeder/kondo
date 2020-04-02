from pprint import pprint

import prometheus_client

from flask import request
from werkzeug.middleware.dispatcher import DispatcherMiddleware

REQUESTS = prometheus_client.Counter(
    "kondo_requests_total", "All HTTP requests", ["method", "path"]
)


def prom_before_request():
    method = request.environ["REQUEST_METHOD"]
    path = request.environ["PATH_INFO"]
    REQUESTS.labels(method, path).inc()


def wrap_with_prometheus(app):
    app.before_request_funcs.setdefault(None, []).append(prom_before_request)
    app.wsgi_app = DispatcherMiddleware(
        app.wsgi_app, {"/metrics": prometheus_client.make_wsgi_app()}
    )

    return app
