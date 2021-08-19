from time import sleep
import RPi.GPIO as GPIO
from STT import *
import argparse
import os, signal

btn = 25
stt = None

# def finish_signal_handler(signum, frame):
#     global stt
#     signal.signal(signal.SIGUSR1, finish_signal_handler)
#     print(signum, "Restart STT")
#     stt.start_stt()

def btn_callback(channel):
    global stt
    print("Button Event detected")
    stt.start_stt()

def main():
    global stt
    parser = argparse.ArgumentParser()
    parser.add_argument('--mode', help='button mode / call mode', default='button')
    args = parser.parse_args()
    STT_MODE = args.mode
    print("START STT:", STT_MODE)

    try:
        global stt
        if STT_MODE == 'call':
            pid = os.getpid()
            stt = STT(pid)
            stt.start_stt()
            # signal.signal(signal.SIGUSR1, finish_signal_handler)

        else:
            # default: button 으로 실행
            stt = STT()
            GPIO.setmode(GPIO.BCM)
            GPIO.setup(btn, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
            GPIO.add_event_detect(btn, GPIO.FALLING, callback=btn_callback, bouncetime=300)

        while True:
            sleep(1)

    except KeyboardInterrupt:
        GPIO.cleanup()

if __name__ == '__main__':
    main()
