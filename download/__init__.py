from rearrange import rearrange
from download.download_helpers import start_download


def download(link, verbose=False):
    start_download(link, verbose)
    rearrange(verbose)
