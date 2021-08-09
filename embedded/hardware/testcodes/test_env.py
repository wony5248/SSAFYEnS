# adc: MCP3008
import spidev, time
import RPi.GPIO as GPIO
import Adafruit_DHT

SOUND_DIG = 17
DHT_PIN = 4

GPIO.setmode(GPIO.BCM)
GPIO.setup(SOUND_DIG, GPIO.IN)

dht = Adafruit_DHT.DHT11
spi = spidev.SpiDev()
spi.open(0,0)
spi.max_speed_hz = 1350000

def analog_read(channel):
    r = spi.xfer2([1, (8 + channel) << 4, 0])
    adc_out = ((r[1]&3) << 8) + r[2]

    return adc_out

try:
    while True:
        light = analog_read(0)
        value = GPIO.input(SOUND_DIG)
        sound = analog_read(1)
        h, t = Adafruit_DHT.read_retry(dht, DHT_PIN)
        if h is not None and t is not None:
            print("Temp: {0:0.1f}*C Humi: {1:0.1f}%".format(t,h))
        else:
            print('Temp/Humi read error')
        time.sleep(1)
        print(light, value, sound)

except KeyboardInterrupt:
    print("over")
    GPIO.cleanup()
