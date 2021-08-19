#!/bin/bash


set_config(){
	echo "config setting"
	sed -i -e 's/#dtparam=spi/dtparam=spi/g' /boot/config.txt
}

install_pip(){
	sudo apt-get update
	sudo apt-get install -y python3-pip
	sudo python3 -m pip install -y --upgrade pip setuptools wheel

	sudo pip3 install Adafruit_DHT
	# TODO : Add RPi4 chip version figuration

	sudo apt-get install -y portaudio19-dev
	sudo pip3 install pyaudio
	sudo pip3 install --upgrade google-cloud-speech
	sudo pip3 install --upgrade google-cloud-texttospeech

}

install_sound(){
	SOUND_PATH=$SHELL_PATH'/hardware/ics43432'
	# remove auto play in desktop OS
	# TODO: version control
	sudo rm -f /etc/xdg/autostart/piwiz.desktop
	echo "sound installation"
	sudo apt-get install -y alsa-utils
	sudo apt-get install -y libasound2-dev
	# mic driver installation
	sed -i -e 's/#dtparam=i2s/dtparam=i2s/g' /boot/config.txt
	sed -i -e 's/#dtparam=audio=on/dtparam=audio=on/g' /boot/config.txt
	ovlay=`grep -n "alsaname=i2sPiSound" /boot/config.txt`
	if [ "$ovlay" = "" ]
	then
		sed -i -e '/dtparam=audio=on/a\dtoverlay=i2s-soundcard,alsaname=i2sPiSound' /boot/config.txt
	fi
	if [ ! -d $SOUND_PATH ]
	then
		mkdir $SOUND_PATH && cd $SOUND_PATH
		KERNEL_RELEASE=`uname -r`
		if [ "$KERNEL_RELEASE" = "5.10.17-v7l+" ]
		then
			wget https://raw.githubusercontent.com/raspberrypi/linux/rpi-5.10.y/sound/soc/codecs/ics43432.c
			# TODO: Add Makefile && build
			# TODO: edit device tree
		fi
		cd $SHELL_PATH
	fi
	sudo cp $SOUND_PATH'/i2s-soundcard.dtbo' /boot/overlays
	echo "SOUND SETTING CLEAR"
}

install_node(){
	NODE_PATH=$SHELL_PATH'/node'
	if [ ! -d $NODE_PATH ]
	then
		mkdir $NODE_PATH && cd $NODE_PATH
		wget https://nodejs.org/dist/v14.17.3/node-v14.17.3-linux-armv7l.tar.xz
		tar -xvf node-v14.17.3-linux-armv7l.tar.xz
		sudo mv node-v14.17.3-linux-armv7l /usr/local/node
		cd $SHELL_PATH
		echo export PATH=/usr/local/node/node-v14.17.3-linux-armv7l/bin:$PATH >> /etc/profile
	fi
}

install_tensorflow(){
	sudo pip3 install https://dl.google.com/coral/python/tflite_runtime-2.1.0.post1-cp37-cp37m-linux_armv7l.whl
}

install_openCV(){
	sudo apt-get -y install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
	sudo apt-get -y install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
	sudo apt-get -y install libxvidcore-dev libx264-dev
	sudo apt-get -y install qt4-dev-tools libatlas-base-dev

	# TODO: Add more installations
}

set_crontab(){
	echo "set crontab"
	(crontab -l 2>/dev/null; echo "* * * * * /usr/bin/python3 $SHELL_PATH/$HARDWARE_PATH/sense_schedule.py >> $SHELL_PATH/$HARDWARE_PATH/sensing_data.log 2>&1") | crontab -
}

SHELL_PATH=`pwd -P`
echo $SHELL_PATH
BACKEND_PATH='backend_rpi'
FRONTEND_PATH='frontend_rpi'
HARDWARE_PATH='hardware'

install_node
# Backend Installation
cd $BACKEND_PATH
echo `pwd`
npm install
cd ..

# Frontend Installation
cd $FRONTEND_PATH
echo `pwd`
sudo apt install -y fonts-unfonts-core
npm install
cd ..

# Hardware Installation
cd $HARDWARE_PATH
echo `pwd`
set_config
set_crontab
install_sound
install_pip
install_tensorflow
install_openCV 
cd ..

