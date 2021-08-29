import pathlib
from os import path

CWD = pathlib.Path().resolve()

OPERATING_FOLDER = path.join(CWD, "files")

RUN_FOLDER = path.join(OPERATING_FOLDER, "run")
BACKUP_FOLDER = path.join(OPERATING_FOLDER, "backup")

MUSIC_LIBRARY_FOLDER = pathlib.Path("../../").resolve()

# FLAC isn't acceptable
AUDIO_FILES_REG_EXP = r"\.(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav)$"
IMAGES_FILES_REG_EXP = r"\.(gif|jpe?g|tiff|png)$"


DOWNLOAD_FOLDER = path.join(OPERATING_FOLDER, "run")
DEEZER_ARL_TOKEN = "59d6a2c911cfcb2ba120775dd093e3bc72790d5eecac664d97bddae97ccf1aa38d2eb62dee539744ca97c30b4e5d833f7e4128a17b6da8350aa8a127764526f778b360ff963c035fdc33f2d35094925a38c0fb78e9f014684cea0c173f97d74c"
DOWNLOAD_QUALITY = "MP3_320"
SHOW_DOWNLOAD_INTERFACE = False
