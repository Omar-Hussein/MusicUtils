from spotipy import Spotify
from exceptions import InvalidLink
from spotipy.exceptions import SpotifyException
from spotipy.cache_handler import CacheFileHandler
from spotipy.oauth2 import SpotifyClientCredentials

from config import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET

class SpotifyHelper:
    def __generate_token(self):
        return SpotifyClientCredentials(
            client_id = SPOTIFY_CLIENT_ID,
            client_secret = SPOTIFY_CLIENT_SECRET,
            cache_handler = CacheFileHandler(".cache_spoty_token"),
        )

    def __init__(self):
        self.__error_codes = [404, 400]

        self.__api = Spotify(
            client_credentials_manager = self.__generate_token()
        )

    def __lazy(self, results):
        albums = results['items']

        while results['next']:
            results = self.__api.next(results)
            albums.extend(results['items'])

        return results

    def get_artist_albums_ids(self, ids):
        try:
            albums_json = self.__api.artist_albums(ids)
        except SpotifyException as error:
            if error.http_status in self.__error_codes:
                raise InvalidLink(ids)

        albums = albums_json["items"]

        ids = [x["id"] for x in albums]

        return ids
