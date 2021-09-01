from utils import text, choose, remove_empty_folders
from config import RUN_FOLDER

from rearrange import rearrange
from download import download
from move_to_lib import move
from lyrics import get_lyrics


APP_OPTIONS = [
    "Download via Deezer or Spotify link",
    "Rearrange music files",
    "Move files to music folder",
    "Remove empty folders"
    "Get lyrics"
]


def main():
    index = choose("What to do?", APP_OPTIONS)

    if index == 0:
        link = text("Enter link")
        download(link, verbose=True)

    if index == 1:
        rearrange(verbose=True)

    if index == 2:
        move()

    if index == 3:
        remove_empty_folders(RUN_FOLDER)

    if index == 4:
        artist = text("Enter artist name")
        song = text("Enter song name")
        get_lyrics(song, artist)

    print("")
    main()


if __name__ == "__main__":
    main()
