import glob
from os import path, remove
from pathlib import Path

from config import RUN_FOLDER, DOWNLOAD_FOLDER, MUSIC_LIBRARY_FOLDER
from utils import remove_empty_folders


def move():
    all_files = glob.iglob(RUN_FOLDER + "**/**", recursive=True)

    for file in all_files:
        if path.isdir(file) or DOWNLOAD_FOLDER in file:
            continue

        dest = file.replace(RUN_FOLDER, MUSIC_LIBRARY_FOLDER)
        dest_folder = path.split(dest)[0]

        try:
            Path(dest_folder).mkdir(parents=True, exist_ok=True)
            Path(file).rename(dest)
        except FileExistsError:
            remove(dest)
            Path(file).rename(dest)

        remove_empty_folders(RUN_FOLDER)
