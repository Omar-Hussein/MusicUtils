import pathlib
from os import path

CWD = pathlib.Path().resolve()

OPERATING_FOLDER = path.join(CWD, "files")

RUN_FOLDER = path.join(OPERATING_FOLDER, "run")
BACKUP_FOLDER = path.join(OPERATING_FOLDER, "backup")
DOWNLOAD_FOLDER = path.join(OPERATING_FOLDER, "download")

MUSIC_LIBRARY_FOLDER = pathlib.Path("../../").resolve()

# FLAC isn't acceptable
AUDIO_FILES_REG_EXP = r"\.(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|m3u|ra|ram|ogg|vorbis|wav)$"
IMAGES_FILES_REG_EXP = r"\.(gif|jpe?g|tiff|png)$"
