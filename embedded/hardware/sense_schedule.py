"""
need to be registered in crontab
```
crontab -e
* * * * * /usr/bin/python3 /home/pi/ssafyens/sense_schedule.py >> //home/pi/ssafyens/sensing_data.log 2>&1
```
"""

from sensor import *
from server import *

sensor = Sensor()
server = Server()
datas = sensor.get_data()
server.post(datas, 'sensor')
