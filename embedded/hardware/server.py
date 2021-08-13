import requests
from datetime import datetime

BASE_SCHEDULE = 'schedule'
SPECIFIC_SCHEDULE = BASE_SCHEDULE+'/{id}'
TODAY_SCHEDULE = BASE_SCHEDULE+'/getdaily/{date}'
CUR_SCHEDULE = TODAY_SCHEDULE+'/current'
WHOLE_SCHEDULE = BASE_SCHEDULE+'/getdaily/secretary/{date}'

class Server():
    def __init__(self):
        self.base_url = 'http://localhost:4500/'
        self.headers = {}
        self.res = None

    def get_timeline(self, time=False):
        cur = datetime.now()
        year = cur.year
        month = cur.month
        day = cur.day
        hour = cur.hour
        min = cur.minute
        if month < 10:
            month = '{0:02d}'.format(month)
        if day < 10:
            day = '{0:02d}'.format(day)
        if time:
            if hour < 10:
                hour = '{0:02d}'.format(hour)
            if min < 10:
                min = '{0:02d}'.format(min)
            return f'{year}{month}{day} {hour}{min}'
        else:
            return f'{year}{month}{day}'


    def post(self, data, route):
        dest_url = self.base_url + route
        print(dest_url)
        try:
            self.res = requests.post(dest_url, json=data, headers=self.headers)
            print("Server status: ", self.res.status_code)
            if self.res.status_code == 200:
                return True
        except Exception as e:
            print("Server errors: ", e)
            return False

    def get(self, route, id=None, date=False):
        dest_url = self.base_url + route
        if id is not None :
            dest_url = dest_url.format(id=id)
        if date:
            dest_url = dest_url.format(date=self.get_timeline())
        print(dest_url)
        try:
            self.res = requests.get(dest_url)
            print("Server status: ", self.res.status_code)
            ret = self.res.json()
            print(ret)
            return ret
        except Exception as e:
            print("Server errors: ", e)
            return None

    def put(self, data, route, id=None):
        dest_url = self.base_url + route
        if id is not None :
            dest_url = dest_url.format(id=id)
        print(dest_url)
        try:
            self.res = requests.put(dest_url, json=data, headers=self.headers)
            print("Server status: ", self.res.status_code)
            if self.res.status_code == 200:
                return True
        except Exception as e:
            print("Server errors: ", e)
            return False

    def delete(self, route, id=None):
        dest_url = self.base_url + route
        if id is not None :
            dest_url = dest_url.format(id=id)
        print(dest_url)
        try:
            self.res = requests.delete(dest_url)
            print("Server status: ", self.res.status_code)
            if self.res.status_code == 200:
                return True
        except Exception as e:
            print("Server errors: ", e)
            return False
