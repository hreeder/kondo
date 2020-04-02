"""CLI Helper Functions"""
import requests


def main():
    """Get the current App List from Valve"""
    applist = requests.get(
        "https://api.steampowered.com/ISteamApps/GetAppList/v2/"
    ).json()
    apps = applist["applist"]["apps"]

    if len(apps) == 0:
        print("Unable to fetch list of apps from Steam")
        return


if __name__ == "__main__":
    main()
