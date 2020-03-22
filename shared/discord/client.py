import requests

from .user import DiscordUser

class Discord:
    def __init__(self, token):
        self._base_url = "https://discordapp.com/api"
        self._token = token

        self.user = DiscordUser(self)

    def _request(self, method, path, **kwargs):
        headers = kwargs.pop("headers", {})
        headers.update({"Authorization": f"Bearer {self._token}"})
        
        url = self._base_url
        if url.endswith("/") and path.startswith("/"):
            url += path[1:]
        else:
            url += path

        response = requests.request(method, url, headers=headers, **kwargs)

        return response.json()

    def _get(self, path, **kwargs):
        return self._request("GET", path, **kwargs)
