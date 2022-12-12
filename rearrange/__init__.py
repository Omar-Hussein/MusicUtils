import re
import glob
import eyed3
from halo import Halo
from os import path, remove
from pathlib import Path

from config import RUN_FOLDER, AUDIO_FILES_REG_EXP

from utils import get_percentage, normalize_filename, remove_files, remove_empty_folders

from rearrange.extract_meta import extract_meta
from rearrange.get_dest import get_dest


def rearrange(verbose=False):
    # Scanning the files
    spinner = Halo(text="Scanning the files")
    if verbose:
        spinner.start()
    all_files = glob.iglob(RUN_FOLDER + "**/**", recursive=True)
    music_files = []
    non_music_files = []

    for file in all_files:
        if re.search(AUDIO_FILES_REG_EXP, file, flags=re.IGNORECASE):
            music_files.append(file)
        elif not path.isdir(file):
            non_music_files.append(file)

    if verbose:
        spinner.info("Removing non audio files...")
    remove_files(non_music_files)

    music_files_len = len(music_files)

    if verbose:
        spinner.info(f"Rearranging {music_files_len} music files")

    for index, file in enumerate(music_files):
        # Remove warn messages
        eyed3.log.setLevel("ERROR")
        # Get metadata
        audio = eyed3.load(file)
        meta_data = extract_meta(file, audio)

        if verbose:
            spinner.start()
            spinner.text = f"{get_percentage(index, music_files_len)} moving: {meta_data['filename']}"

        # Get destination
        dest_folder = get_dest(meta_data)
        dest = path.join(dest_folder, normalize_filename(
            f"{meta_data['track_num']:02}. {meta_data['title']}{meta_data['ext'].lower()}"))

        # Move on a new path
        if file != dest:
            try:
                Path(dest_folder).mkdir(parents=True, exist_ok=True)
                Path(file).rename(dest)
            except FileExistsError:
                remove(dest)
                Path(file).rename(dest)

    # Remove empty folder
    if verbose:
        spinner.info("Removing empty folders...")

    remove_empty_folders(RUN_FOLDER)

    # Recreate the music root folder if it got deleted
    Path(RUN_FOLDER).mkdir(exist_ok=True)

    if verbose:
        spinner.succeed(f"Rearranged {RUN_FOLDER}")
