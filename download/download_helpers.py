import deezloader
from config import DEEZER_ARL_TOKEN, DOWNLOAD_FOLDER, DOWNLOAD_QUALITY


downloa = deezloader.Login(DEEZER_ARL_TOKEN)


def start_download(link, verbose=False):
    if "deezer" in link:
        if "album" in link:
            get_deezer_album(link, verbose)
        elif "track" in link:
            get_deezer_track(link, verbose)
    if "spotify" in link:
        if "album" in link:
            get_spotify_album(link, verbose)
        elif "track" in link:
            get_spotify_track(link, verbose)


def get_deezer_album(link, verbose):
    downloa.download_albumdee(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)


def get_deezer_track(link, verbose):
    downloa.download_trackdee(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)


def get_spotify_track(link, verbose):
    downloa.download_trackspo(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)


def get_spotify_album(link, verbose):
    downloa.download_albumspo(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not verbose)
