class InvalidLink(Exception):
    def __init__(self, url):
        self.url = url
        self.msg = f"Invalid Link {self.url} :("
        super().__init__(self.msg)
