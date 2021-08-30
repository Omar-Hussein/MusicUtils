import re
from flask import Flask, request
from flask_cors import CORS

from rearrange import rearrange
from download import download
from move_to_lib import move

app = Flask(__name__)
CORS(app)


@app.route("/rearrange")
def start_rearrange():
    rearrange()
    return "rearranged"


@app.route("/move/<foldername>")
def move_to_folder(foldername="English"):
    VALID_FOLDERS = ["English", "Arabic", "Español",
                     "Classical Music", "Français", "Soundtracks", "Русский"]
    if not foldername in VALID_FOLDERS:
        return "Invalid folder name", 400

    move(foldername)
    return "moved"


@app.route("/download")
def start_downloading():
    link = request.args.get("link")

    if not re.match(r"https://open.spotify.com/(album|playlist|artist)/*", link):
        return "Invalid album link", 400

    download(link)
    return "downloaded"
