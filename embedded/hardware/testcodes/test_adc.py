# adc: MCP3008
import spidev, time
import RPi.GPIO as GPIO

SOUND_DIG = 17

GPIO.setmode(GPIO.BCM)
GPIO.setup(SOUND_DIG, GPIO.IN)

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
        #print("light: ", light, "noise: ", value, end = ' ')
        sound = analog_read(1)
        #print(sound)
        time.sleep(1)
        print(light, value, sound)

except KeyboardInterrupt:
    print("over")
    GPIO.cleanup()
