import requests, json

class Server():
    def __init__(self):
        self.url = 'http://localhost:4500/test/sensor'
        self.headers = {}
        self.res = None

    def post(self, data):
        try:
            self.res = requests.post(self.url, json=data, headers=self.headers)
            print("Server status: ", self.res.status_code)
        except Exception as e:
            print("Server errors: ", e)
