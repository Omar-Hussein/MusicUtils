from rearrange import rearrange
from download import download
from utils import text, choose
from move_to_lib import move

APP_OPTIONS = [
    "Download via Deezer or Spotify link",
    "Rearrange music files",
    "Move files to music folder"
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
        folder = text("enter folder name")
        move(folder)

    print("")
    main()


if __name__ == "__main__":
    main()
