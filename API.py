from flask import Flask, request
from flask_cors import CORS

from utils import wrap_in_tag

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
    return download(link, for_api=True)


@app.route("/lyrics")
def lyrics():
    artist = request.args.get("artist")
    song = request.args.get("song")
    should_not_wrap = request.args.get("dont-wrap") or "0"

    if not song:
        return "No song name provided", 400

    lyrics = get_lyrics(song, artist)
    wrapped_lyrics = wrap_in_tag("pre", lyrics)

    if should_not_wrap == "1":
        return lyrics

    else:
        return wrapped_lyrics
