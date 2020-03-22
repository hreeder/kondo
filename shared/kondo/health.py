from flask import Blueprint, jsonify

HEALTH = Blueprint("health", __name__)


@HEALTH.route("/")
def healthcheck():
    return jsonify(status="online")
