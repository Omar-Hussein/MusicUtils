import re
from exceptions import InvalidLink, InvalidQuality
from rearrange import rearrange
from download.download_helpers import start_download

LINK_RE = r"https://(open.spotify|www.deezer).com(/us|/en)?/(album|playlist|artist)/*"
QUALITIES = ["FLAC", "MP3_320", "MP3_128"]

def download(link, quality="MP3_320", should_rearrange=True, verbose=False, for_api=False):
    if not re.match(LINK_RE, link):
        if for_api:
            return "Invalid album link", 400
        else:
            raise InvalidLink(link)

    if not quality in QUALITIES:
        raise InvalidQuality(quality)

    try:
        start_download(link, quality=quality, verbose=verbose)

        if should_rearrange:
            rearrange(verbose)

        if for_api:
            return "Downloaded"
        else:
            return

    except Exception as e:
        print(e)
