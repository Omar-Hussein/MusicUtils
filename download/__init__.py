from rearrange import rearrange
from download.download_helpers import start_download
from utils.start_dialogue import text


def download():
    # TODO: add the ability to provide a file with links

    link = text("Enter link")
    start_download(link)
    rearrange()
