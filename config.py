from os import path, getenv
from dotenv import load_dotenv

load_dotenv()

CONFIG_LOCATION = path.dirname(path.realpath(__file__))
APP_ROOT = CONFIG_LOCATION

OPERATING_FOLDER = path.join(APP_ROOT, "files")

RUN_FOLDER = OPERATING_FOLDER  # path.join(OPERATING_FOLDER, "run")
BACKUP_FOLDER = OPERATING_FOLDER  # path.join(OPERATING_FOLDER, "backup")

MUSIC_LIBRARY_FOLDER = "E:\Music"  # pathlib.Path("../../Music").resolve()

# FLAC isn't acceptable for now
AUDIO_FILES_REG_EXP = r"\.(ac3|m4a|au|snd|pcm|mid|rmi|mp3|mp4|aif|aifc|aiff|ra|ram|ogg|vorbis|wav)$"
IMAGES_FILES_REG_EXP = r"\.(gif|jpe?g|tiff|png)$"


DOWNLOAD_FOLDER_NAME = "download"
DOWNLOAD_FOLDER = path.join(RUN_FOLDER, DOWNLOAD_FOLDER_NAME)
DEEZER_ARL_TOKEN = getenv("DEEZER_ARI_TOKEN")
DEEZER_EMAIL = getenv("DEEZER_EMAIL")
DEEZER_PASSWORD = getenv("DEEZER_PASSWORD")

GENIUS_TOKEN = getenv("GENIUS_CLIENT_ACCESS_TOKEN")


SPOTIFY_CLIENT_ID = "c6b23f1e91f84b6a9361de16aba0ae17"
SPOTIFY_CLIENT_SECRET = "237e355acaa24636abc79f1a089e6204"
