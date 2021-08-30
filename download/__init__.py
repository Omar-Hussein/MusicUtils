from rearrange import rearrange
from download.download_helpers import start_download
from utils.start_dialogue import text


def download(link, verbose=False):
    start_download(link, verbose)
    rearrange(verbose)
