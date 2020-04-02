"""Discord Authentication Service."""
import os

from urllib.parse import urlencode

import requests

from flask import Blueprint, jsonify, redirect, url_for, request

from shared.discord import Discord
from shared.kondo.flask import header_required

AUTH = Blueprint("discord_auth", __name__, url_prefix="/auth/discord")

with open(os.environ["DISCORD_CLIENT_ID"]) as client_id:
    CLIENT_ID = client_id.read()

with open(os.environ["DISCORD_CLIENT_SECRET"]) as client_secret:
    CLIENT_SECRET = client_secret.read()


@AUTH.route("/")
def begin():
    """Begin Discord Authorization Flow."""
    authorize_url = "https://discordapp.com/api/oauth2/authorize"
    redirect_uri = request.args.get("redirect") or url_for(".callback", _external=True)
    params = {
        "client_id": CLIENT_ID,
        "scope": " ".join(["identify", "guilds"]),
        "response_type": "code",
        "redirect_uri": redirect_uri,
    }

    return redirect(f"{authorize_url}?{urlencode(params)}")


@AUTH.route("/callback")
def callback():
    """Handle callback after the user has authenticated against Discord."""
    code = request.args["code"]
    redirect_uri = request.args.get("redirect") or url_for(".callback", _external=True)
    params = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
    }
    jwt = requests.post(
        "https://discordapp.com/api/oauth2/token",
        params=params,
        auth=(CLIENT_ID, CLIENT_SECRET),
    )
    jwt_data = jwt.json()
    if jwt.status_code != 200:
        return jsonify(**jwt_data), jwt.status_code

    response = {"jwt": jwt_data}

    if "access_token" in jwt_data:
        discord = Discord(jwt_data["access_token"])
        response["user_info"] = discord.user()

    return jsonify(**response)


@AUTH.route("/userinfo")
@header_required("Authorization", status="unauthorized", code=401)
def userinfo():
    """Return discord @me endpoint"""
    token = request.headers.get("Authorization").split("Bearer ", 1)[1]
    discord = Discord(token)
    return jsonify(**discord.user())
