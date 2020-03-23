"""Discord Authentication Service."""
import os

from urllib.parse import urlencode

import requests

from flask import Blueprint, jsonify, redirect, url_for, request

from shared.discord import Discord

AUTH = Blueprint("discord_auth", __name__)

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
    params = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": url_for(".callback", _external=True),
    }
    jwt = requests.post(
        "https://discordapp.com/api/oauth2/token",
        params=params,
        auth=(CLIENT_ID, CLIENT_SECRET),
    )
    jwt = jwt.json()
    response = {"jwt": jwt}

    if "access_token" in jwt:
        discord = Discord(jwt["access_token"])
        response["user_info"] = discord.user()

    return jsonify(**response)
