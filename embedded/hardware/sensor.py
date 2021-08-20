import spidev, time, json
import RPi.GPIO as GPIO
import Adafruit_DHT

SOUND_DIG = 17
DHT_PIN = 4

class Sensor():
    def __init__(self):
        self.SOUND = SOUND_DIG
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(SOUND_DIG, GPIO.IN)
        self.spi = None
        self.dht = None
        self.data = {}
        self.settings()

    def settings(self):
        self.spi = spidev.SpiDev()
        self.spi.open(0,0)
        self.spi.max_speed_hz = 1350000
        self.dht = Adafruit_DHT.DHT11

    def analog_read(self,channel):
        r = self.spi.xfer2([1, (8 + channel) << 4, 0])
        adc_out = ((r[1]&3) << 8) + r[2]

        return adc_out

    def get_temp_humid(self):
        h, t = Adafruit_DHT.read_retry(self.dht, DHT_PIN)
        return h,t
        if h is not None and t is not None:
            return h,t
        else:
            return None, None

    def get_data(self):
        light = self.analog_read(0)
        value = GPIO.input(SOUND_DIG)
        sound = self.analog_read(1)
        humi, temp = self.get_temp_humid()
        self.data = {"temp": temp, "humid": humi, "noise": sound//20, "light": light}
        print(self.data)
        return self.data
