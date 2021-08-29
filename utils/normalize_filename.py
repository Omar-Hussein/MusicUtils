import re


def normalize_filename(file_name: str):
    return re.sub(r"([\\/|?*<>:\"]|\.$)", "", file_name).strip()
