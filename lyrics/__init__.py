import re

from config import GENIUS_TOKEN
from exceptions import NoSongProvided

from lyricsgenius import Genius

def login():
    genius = Genius(GENIUS_TOKEN)

def get_lyrics(song, artist=None, verbose=False):
    if not genius:
        login()
    genius.verbose = verbose
    if not song:
        raise NoSongProvided
    song_data = genius.search_song(song, artist)
    lyrics = re.sub(r"\d+EmbedShare URLCopyEmbedCopy$", "", song_data.lyrics)
    return lyrics
