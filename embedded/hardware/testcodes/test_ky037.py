# digital only
import RPi.GPIO as GPIO
from time import sleep

dig_pin = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(dig_pin, GPIO.IN)

try:
    while True:
        value = GPIO.input(dig_pin)
        print(value)
        sleep(1)

except KeyboardInterrupt:
    print("over")
    GPIO.cleanup()
