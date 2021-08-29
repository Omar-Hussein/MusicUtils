import math


def get_percentage(index, total, includeSymbol=True):
    percentage = f"{math.ceil((index + 1 / total) * 100)}"
    if includeSymbol:
        percentage += "%"
    return percentage
