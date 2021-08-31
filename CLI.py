from rearrange import rearrange
from download import download
from utils import text, choose, remove_empty_folders
from move_to_lib import move
from config import RUN_FOLDER

APP_OPTIONS = [
    "Download via Deezer or Spotify link",
    "Rearrange music files",
    "Move files to music folder",
    "Remove empty folders"
]


def main():
    index = choose("What to do?", APP_OPTIONS)

    if index == 0:
        # TODO: add the ability to provide a file with links
        link = text("Enter link")
        download(link, verbose=True)

    if index == 1:
        rearrange(verbose=True)

    if index == 2:
        move()

    if index == 3:
        remove_empty_folders(RUN_FOLDER)

    print("")
    main()


if __name__ == "__main__":
    main()
