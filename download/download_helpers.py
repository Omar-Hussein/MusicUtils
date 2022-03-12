import re

from deezloader.deezloader import DeeLogin
from config import DEEZER_ARL_TOKEN, DEEZER_EMAIL, DEEZER_PASSWORD, DOWNLOAD_FOLDER
from download.spotify import SpotifyHelper

from exceptions import NoDeezerCredentials


if DEEZER_EMAIL and DEEZER_PASSWORD:
    downloa = DeeLogin(email=DEEZER_EMAIL, password=DEEZER_PASSWORD, arl=DEEZER_ARL_TOKEN)
else:
    raise NoDeezerCredentials


def start_download(link, quality="MP3_320", verbose=False):
    if "deezer" in link:
        if "album" in link:
            get_deezer_album(link, verbose, quality)
        elif "track" in link:
            get_deezer_track(link, verbose, quality)
    elif "spotify" in link:
        if "album" in link:
            get_spotify_album(link, verbose, quality)
        elif "track" in link:
            get_spotify_track(link, verbose, quality)
        elif "artist" in link:
            spotify_helper = SpotifyHelper()
            artist_id = re.search(r"\w{22}", link).group()
            albums_ids = spotify_helper.get_artist_albums_ids(artist_id)
            for album_id in albums_ids:
                start_download(
                    f"https://open.spotify.com/album/{album_id}", quality=quality, verbose=verbose)


def get_deezer_album(link, verbose, quality):
    downloa.download_albumdee(link, output_dir=DOWNLOAD_FOLDER, quality_download=quality,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)


def get_deezer_track(link, verbose, quality):
    downloa.download_trackdee(link, output_dir=DOWNLOAD_FOLDER, quality_download=quality,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)


def get_spotify_track(link, verbose, quality):
    downloa.download_trackspo(link, output_dir=DOWNLOAD_FOLDER, quality_download=quality,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)


def get_spotify_album(link, verbose, quality):
    downloa.download_albumspo(link, output_dir=DOWNLOAD_FOLDER, quality_download=quality,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)
