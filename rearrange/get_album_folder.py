import re

ALBUM_TYPES_DATA = [
    (r"\b(live|itunes session)\b", "Live"),
    (r"\bdemos?\b", "Demos"),
    (r"\bremix(es)?\b", "Remixes"),
    (r"\bunreleased\b", "Unreleased"),
    (
        r"\b(compilations|(platinum)? ?collection|best of|essential|greatests? hits|the best|mixtape)\b",
        "Compilations",
    ),
    (r"\b( |-)?eps?\b", "EPs"),
    (r"\bsing(le|el)\b", "Singles"),
]


def get_album_folder(album, comment) -> str:
    if not album and not comment:
        return "No Album"

    result = "Albums"

    for rexp, folder in ALBUM_TYPES_DATA:
        # Check the comment first
        if comment:
            if re.search(rexp, comment, flags=re.IGNORECASE):
                result = folder
        # If it still is "Albums", meaning it didn't change
        #   check with the album name
        if result == "Albums":
            if re.search(rexp, album, flags=re.IGNORECASE):
                result = folder

    return result
