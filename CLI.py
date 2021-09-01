import re
import argparse

from utils import remove_empty_folders
from config import RUN_FOLDER
from exceptions import InvalidLink

from rearrange import rearrange
from download import download
from move_to_lib import move
from lyrics import get_lyrics


def main():
    actions = ["download", "move", "arrange", "lyrics", "remove-empty"]
    parser = argparse.ArgumentParser(description="Music utils app")

    parser.add_argument("action", choices=actions,
                        help="action you'd like to preform")

    action = parser.parse_known_args()[0].action

    parser.add_argument(
        "--link", help="link to download (with download action)", required=action == "download")

    parser.add_argument(
        "--song", help="link to download (with lyrics action)", required=action == "lyrics")
    parser.add_argument(
        "--artist", help="link to download (with lyrics action)")

    parser.add_argument(
        "--verbose", "-v", action=argparse.BooleanOptionalAction, default=True,
        help="make the action verbose")

    args = parser.parse_args()
    verbose = args.verbose

    if action == "move":
        move()

    elif action == "arrange":
        rearrange(verbose=verbose)

    elif action == "lyrics":
        song = args.song
        artist = args.artist

        lyrics = get_lyrics(song, artist, verbose=verbose)
        print(lyrics)

    elif action == "download":
        link = args.link

        if not re.match(r"https://open.spotify.com/(album|playlist|artist)/*", link):
            raise InvalidLink(link)
        download(link, verbose=verbose)

    elif action == "remove-empty":
        remove_empty_folders(RUN_FOLDER)


if __name__ == "__main__":
    main()
