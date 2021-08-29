from rearrange import rearrange
from download import download
from utils.start_dialogue import choose

APP_OPTIONS = [
    "Download via Deezer or Spotify link",
    "Rearrange music files",
    # "Move files to music folder"
]


def main():
    index = choose("What to do?", APP_OPTIONS)

    if index == 0:
        download()

    if index == 1:
        rearrange()

    print("")
    main()


if __name__ == "__main__":
    main()
