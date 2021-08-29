import re


def confirm(question: str, default: bool = True) -> bool:
    options = "(Y/n)" if default == True else "(y/N)"
    result = input(f"{question} {options} ")

    if not result:
        return default
    if re.match(r"^y(es)?$", result, flags=re.IGNORECASE):
        return True
    elif re.match(r"^n(o)?$", result, flags=re.IGNORECASE):
        return False
    else:
        print("Please enter \"y\" or \"n\"\n")
        return confirm(question, default)
