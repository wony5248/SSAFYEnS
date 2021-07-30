import Adafruit_DHT
import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BCM)
dht = Adafruit_DHT.DHT11
dht_pin = 4

h, t = Adafruit_DHT.read_retry(dht, dht_pin)
if h is not None and t is not None:
    print("Temp: {0:0.1f}*C Humi: {1:0.1f}%".format(t,h))
else:
    print('Read error')
sleep(1)
