from sqlalchemy.dialects.postgresql import UUID

from .extensions import db


class GameSession(db.Model):
    session_id = db.Column(UUID(as_uuid=True), primary_key=True)
    name = db.Column(db.String(256))

    game_id = db.Column(UUID(as_uuid=True), db.ForeignKey("game_title.game_id"))
    game = db.relationship(
        "GameTitle",
        foreign_keys="GameSession.game_id",
        backref=db.backref("sessions", lazy="joined"),
    )

    slots = db.Column(db.Integer)
    time = db.Column(db.DateTime(timezone=True))
    host = db.Column(db.Integer)

    def as_dict(self):
        return {
            "session_id": self.session_id,
            "name": self.name,
            "game": self.game.as_dict(),
            "slots": self.slots,
            "time": self.time,
            "host": self.host,
        }


class GameTitle(db.Model):
    game_id = db.Column(UUID(as_uuid=True), primary_key=True)
    name = db.Column(db.String(256))

    steam_app_id = db.Column(db.Integer())
    image_url = db.Column(db.String(512))

    def as_dict(self):
        return {
            "game_id": self.game_id,
            "name": self.name,
            "steam_app_id": self.steam_app_id,
            "image_url": self.image_url,
        }
