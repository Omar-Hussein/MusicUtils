import os


def remove_files(files):
    for file in files:
        if os.path.exists(file):
            os.remove(file)
