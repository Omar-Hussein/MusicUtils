import inquirer


def text(question):
    return inquirer.text(message=question)


def confirm(question, default=True):
    return inquirer.confirm(question, default=default)


def choose(question, options):
    # answer = inquirer.list_input(question, choices=options, default=default)
    # return options.index(answer)
    for index, option in enumerate(options):
        print(f"{index}: {option}")

    index = text(f"{question} (enter index)")
    return int(index) if index else None
