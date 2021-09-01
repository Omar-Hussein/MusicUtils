import re
from flask import Flask, request
from flask_cors import CORS

from rearrange import rearrange
from download import download
from move_to_lib import move
from lyrics import get_lyrics

app = Flask(__name__)
CORS(app)


@app.route("/is-online")
def is_server_running():
    return "Yes"


@app.route("/rearrange")
def start_rearrange():
    rearrange()
    return "Rearranged"


@app.route("/move")
def move_to_folder():
    move()
    return "Moved"


@app.route("/download")
def start_downloading():
    link = request.args.get("link")

    if not re.match(r"https://open.spotify.com/(album|playlist|artist)/*", link):
        return "Invalid album link", 400

    download(link)
    return "Downloaded"


@app.route("/lyrics")
def lyrics():
    artist = request.args.get("artist")
    song = request.args.get("song")

    if not song:
        return "No song name provided", 400

    return get_lyrics(song, artist)
