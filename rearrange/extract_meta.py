import re
from os import path
from datetime import date


def extract_meta(file_src: str, audio_file):
    tags = audio_file.tag
    basename = path.basename(file_src)
    filename = basename
    ext = path.splitext(file_src)[1]
    title = tags.title
    artist = tags.artist
    album = tags.album
    album_artist = tags.album_artist
    track_num, album_tracks_num = tags.track_num
    disc_num,  total_discs = tags.disc_num
    lyrics = "".join([i.text for i in tags.lyrics])
    comments = "".join([i.text for i in tags.comments]).strip()
    best_date = tags.best_release_date

    year = best_date and best_date.year
    if not year or year > date.today().year + 1 or year < 1000:
        if best_date:
            year = re.search(r"\d{4}", best_date).group()
        else:
            year = "0000"

    return {
        "filename": filename,
        "ext": ext,
        "basename": basename,
        "title": title,
        "artist": artist,
        "album_artist": album_artist,
        "album": album,
        "track_num": track_num or 1,
        "album_tracks_num": album_tracks_num or 1,
        "disc_num": disc_num or 1,
        "total_discs": total_discs or 1,
        "lyrics": lyrics,
        "comments": comments,
        "year": year
    }
