import pathlib
from os import path

CONFIG_LOCATION = path.dirname(path.realpath(__file__))
APP_ROOT = CONFIG_LOCATION

OPERATING_FOLDER = path.join(APP_ROOT, "files")

RUN_FOLDER = OPERATING_FOLDER # path.join(OPERATING_FOLDER, "run")
BACKUP_FOLDER = OPERATING_FOLDER # path.join(OPERATING_FOLDER, "backup")

MUSIC_LIBRARY_FOLDER = pathlib.Path("../../Music").resolve()

# FLAC isn't acceptable for now
AUDIO_FILES_REG_EXP = r"\.(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav)$"
IMAGES_FILES_REG_EXP = r"\.(gif|jpe?g|tiff|png)$"


DOWNLOAD_FOLDER_NAME = "download"
DOWNLOAD_FOLDER = path.join(RUN_FOLDER, DOWNLOAD_FOLDER_NAME)
DEEZER_ARL_TOKEN = "59d6a2c911cfcb2ba120775dd093e3bc72790d5eecac664d97bddae97ccf1aa38d2eb62dee539744ca97c30b4e5d833f7e4128a17b6da8350aa8a127764526f778b360ff963c035fdc33f2d35094925a38c0fb78e9f014684cea0c173f97d74c"
DOWNLOAD_QUALITY = "MP3_320"


SPOTIFY_CLIENT_ID = "c6b23f1e91f84b6a9361de16aba0ae17"
SPOTIFY_CLIENT_SECRET = "237e355acaa24636abc79f1a089e6204"
