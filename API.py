import re
from flask import Flask, request
from flask_cors import CORS

from rearrange import rearrange
from download import download
from move_to_lib import move

app = Flask(__name__)
CORS(app)


@app.route("/is-online")
def is_server_running():
    return "Yes"


@app.route("/rearrange")
def start_rearrange():
    rearrange()
    return "Rearranged"


@app.route("/move/<foldername>")
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
