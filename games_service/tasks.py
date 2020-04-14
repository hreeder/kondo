#!/usr/bin/env python
from uuid import uuid4

import requests

from .extensions import db
from .routes import GAMES
from .models import GameTitle


@GAMES.cli.command("update-steam-cache")
def update_cache():
    data = requests.get("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
    games = data.json()

    all_known_steam_apps = (
        GameTitle.query.with_entities(GameTitle.steam_app_id)
        .filter(GameTitle.steam_app_id != None)
        .all()
    )
    known_app_ids = {app.steam_app_id for app in all_known_steam_apps}
    apps_to_add = [
        game for game in games["applist"]["apps"] if game["appid"] not in known_app_ids
    ]

    for idx, game in enumerate(apps_to_add):
        new_game = GameTitle(
            game_id=str(uuid4()), name=game["name"], steam_app_id=game["appid"]
        )
        print(
            f"[{idx+1}/{len(apps_to_add)}] Adding {new_game.name} "
            f"[{new_game.steam_app_id}] ({new_game.game_id})"
        )
        db.session.add(new_game)
        db.session.commit()
