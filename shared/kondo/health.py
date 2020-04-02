from flask import Blueprint, jsonify

HEALTH = Blueprint("health", __name__, url_prefix="/_health")


@HEALTH.route("/")
def healthcheck():
    return jsonify(status="online")
