class DiscordUser:
    def __init__(self, discord_client):
        self._client = discord_client

    def __call__(self, user_id="@me"):
        return self._client._get(f"/users/{user_id}")

    def guilds(self):
        return self._client._get("/users/@me/guilds")
