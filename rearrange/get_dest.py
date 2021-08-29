import re
from os import path
from rearrange.get_album_folder import get_album_folder
from utils.normalize_filename import normalize_filename
from config import RUN_FOLDER


def get_dest(meta_data):
    album_folder = get_album_folder(meta_data["album"], meta_data["comments"])

    dir_data = {
        "artist": meta_data["album_artist"],
        "album": meta_data["album"],
        "title": meta_data["title"],
        "album_folder": album_folder,
        "current_disc": meta_data["disc_num"],
        "discs": meta_data["total_discs"],
        "year": meta_data["year"],
        "has_albums_folder": True,
    }

    # Set if it needs sub album folder or not
    if re.search(r"No Album|Unreleased", dir_data["album_folder"], flags=re.IGNORECASE):
        dir_data["has_albums_folder"] = False

    # Fallbacks for unprovided data
    if not dir_data["artist"] or not dir_data["title"] or not dir_data["album"]:
        if not dir_data["artist"]:
            dir_data["artist"] = "Unknown"
            dir_data["album_folder"] = "No Album"
            dir_data["has_albums_folder"] = False
        elif not dir_data["title"]:
            dir_data["title"] = "No Title"

    # Optimizing the (artist, album and title) to be suitable fot a folder|file name
    single_or_ep_re = r" ?( |-|\(|\[) ?(ep|sing(le|el)(s|es)?(.+)?)"

    dir_data["artist"] = normalize_filename(
        re.sub("\u0000", " & ", dir_data["artist"]))
    dir_data["title"] = normalize_filename(dir_data["title"])
    dir_data["album"] = normalize_filename(
        re.sub(single_or_ep_re, "", dir_data["album"], flags=re.IGNORECASE))

    # Sets the dest format
    if not dir_data["has_albums_folder"]:
        return path.join(RUN_FOLDER, dir_data["artist"], dir_data["album_folder"])
    if dir_data["discs"] and dir_data["discs"] > 1:
        return path.join(RUN_FOLDER, dir_data['artist'], dir_data['album_folder'], f"[{dir_data['year']}] {dir_data['album']}", f"CD {dir_data['current_disc']}")
    return path.join(RUN_FOLDER, dir_data['artist'], dir_data['album_folder'], f"[{dir_data['year']}] {dir_data['album']}")
