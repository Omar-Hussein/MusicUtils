import deezloader
from config import DEEZER_ARL_TOKEN, DOWNLOAD_FOLDER, DOWNLOAD_QUALITY, SHOW_DOWNLOAD_INTERFACE


downloa = deezloader.Login(DEEZER_ARL_TOKEN)


def start_download(link):
    if "deezer" in link:
        if "album" in link:
            get_deezer_album(link)
        elif "track" in link:
            get_deezer_track(link)
    if "spotify" in link:
        if "album" in link:
            get_spotify_album(link)
        elif "track" in link:
            get_spotify_track(link)


def get_deezer_album(link):
    downloa.download_albumdee(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not SHOW_DOWNLOAD_INTERFACE)


def get_deezer_track(link):
    downloa.download_trackdee(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not SHOW_DOWNLOAD_INTERFACE)


def get_spotify_track(link):
    downloa.download_trackspo(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not SHOW_DOWNLOAD_INTERFACE)


def get_spotify_album(link):
    downloa.download_albumspo(link, output_dir=DOWNLOAD_FOLDER, quality_download=DOWNLOAD_QUALITY,
                              recursive_quality=False, recursive_download=False, not_interface=not SHOW_DOWNLOAD_INTERFACE)
