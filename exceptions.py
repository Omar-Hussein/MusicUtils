class InvalidLink(Exception):
    def __init__(self, url):
        self.url = url
        self.msg = f"Invalid Link {self.url} :("
        super().__init__(self.msg)


class NoDeezerCredentials(BaseException):
    def __init__(self):
        self.msg = f"You have to provide email and password or an ARI token"
        super().__init__(self.msg)
