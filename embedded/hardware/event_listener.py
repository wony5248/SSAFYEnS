from time import sleep
import RPi.GPIO as GPIO
from STT import *

btn = 25
stt = None

def btn_callback(channel):
    global stt
    print("Button Event detected")
    stt.start_stt()

def main():
    global stt
    try:
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(btn, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
        GPIO.add_event_detect(btn, GPIO.FALLING, callback=btn_callback, bouncetime=300)

        stt = STT()

        while True:
            sleep(1)

    except KeyboardInterrupt:
        GPIO.cleanup()

if __name__ == '__main__':
    main()
