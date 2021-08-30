import re
from flask import Flask, request
from flask_cors import CORS

from rearrange import rearrange
from download import download

app = Flask(__name__)
CORS(app)

@app.route("/rearrange")
def start_rearrange():
    rearrange()
    return "Rearranged"


@app.route("/download")
def start_downloading():
    link = request.args.get("link")
    if re.match(r"https://open.spotify.com/(album|playlist|artist)/*", link):
        download(link)
        return "downloaded"
    else:
        return "Invalid album link", 400
