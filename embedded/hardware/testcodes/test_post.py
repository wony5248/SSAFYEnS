import requests, json

url='http://localhost:3000/test/sensor'
data = {"temp": "32", "humid":"62", "noise":500, "light":800}
headers = {}
res = requests.post(url, json=data, headers=headers)
print(res.status_code)
print(res.text)
print(res.request, res.request.body, res.content)
print(res.json())
