import re
from flask import Flask, request

from rearrange import rearrange
from download import download

app = Flask(__name__)

@app.route("/rearrange")
def start_rearrange():
    rearrange()
    return "Rearranged"


@app.route("/download")
def start_downloading():
    link = request.args.get("link")
    if re.match(r"https://open.spotify.com/album/*", link):
        download(link)
    return "downloaded"
