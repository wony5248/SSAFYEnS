import requests
from datetime import datetime

class Server():
    def __init__(self):
        self.base_url = 'http://localhost:4500/'
        self.headers = {}
        self.res = None

    def get_date(self):
        today = datetime.now()
        year = today.year
        month = today.month
        day = today.day
        if month < 10:
            month = '{0:02d}'.format(month)
        if day < 10:
            day = '{0:02d}'.format(day)
        return f'{year}{month}{day}'

    def post(self, data, route):
        dest_url = self.base_url + route
        print(dest_url)
        try:
            self.res = requests.post(dest_url, json=data, headers=self.headers)
            print("Server status: ", self.res.status_code)
        except Exception as e:
            print("Server errors: ", e)

    def get(self, route, id=None, date=False):
        dest_url = self.base_url + route
        if id is not None :
            dest_url = dest_url.format(id=id)
        if date:
            dest_url = dest_url.format(date=self.get_date())
        print(dest_url)
        try:
            self.res = requests.get(dest_url)
            print("Server status: ", self.res.status_code)
            ret = self.res.json()
            print(ret)
            return ret
        except Exception as e:
            print("Server errors: ", e)

    def put(self, data, route, id=None):
        dest_url = self.base_url + route
        if id is not None :
            dest_url = dest_url.format(id=id)
        print(dest_url)
        try:
            self.res = requests.put(dest_url, json=data, headers=self.headers)
            print("Server status: ", self.res.status_code)
        except Exception as e:
            print("Server errors: ", e)

    def delete(self, route, id=None):
        dest_url = self.base_url + route
        if id is not None :
            dest_url = dest_url.format(id=id)
        print(dest_url)
        try:
            self.res = requests.delete(dest_url)
            print("Server status: ", self.res.status_code)
        except Exception as e:
            print("Server errors: ", e)
