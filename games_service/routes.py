from uuid import uuid4

from flask import Blueprint, jsonify, request
from sqlalchemy import func, text

from shared.discord import Discord
from shared.kondo.flask import header_required

from .extensions import db
from .models import GameSession, GameTitle

GAMES = Blueprint("games_service", __name__, url_prefix="/games")


@GAMES.route("/", methods=["GET", "POST"])
@header_required("Authorization", status="unauthorized", code=401)
def all_games():
    if request.method == "GET":
        sessions = GameSession.query.all()
        return jsonify(games=[session.as_dict() for session in sessions])

    token = request.headers.get("Authorization").split("Bearer ", 1)[1]
    discord = Discord(token)
    current_user = discord.user()

    data = request.get_json()
    GameTitle.get_or_404(data["game_id"])

    new_session = GameSession(
        session_id=str(uuid4()),
        name=data["name"],
        game_id=data["game_id"],
        slots=data["slots"],
        time=data["time"],
        host=current_user["id"],
    )
    db.session.add(new_session)
    db.session.commit()
    return jsonify(session=new_session.as_dict()), 201


@GAMES.route("/title/suggest")
def gametitle_autocomplete_suggestion():
    query = f"%{request.args['query']}%"
    titles = (
        db.session.query(GameTitle, func.count(GameTitle.game_id).label("count"))
        .outerjoin(GameSession)
        .filter(GameTitle.name.ilike(query))
        .group_by(GameTitle.game_id)
        .order_by(text("count DESC"))
        .limit(10)
        .all()
    )

    return jsonify(titles=[title[0].as_dict() for title in titles])
