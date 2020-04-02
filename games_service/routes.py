from flask import Blueprint, jsonify

GAMES = Blueprint("games_service", __name__, url_prefix="/games")


@GAMES.route("/")
def all_games():
    return jsonify(games=[])
