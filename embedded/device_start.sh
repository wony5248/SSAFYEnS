#!/bin/bash

SHELL_PATH=`pwd -P`
echo $SHELL_PATH
BACKEND_PATH='backend_rpi'
FRONTEND_PATH='frontend_rpi'
HARDWARE_PATH='hardware'
STREAMING_PATH='streaming'
# Need to be fixed when change the key
GCP_KEY='ssafyens-71ea8d7e740e.json'

start_backend(){
	cd $SHELL_PATH/$BACKEND_PATH
	npm start
}

start_frontend(){
	cd $SHELL_PATH/$FRONTEND_PATH
	npm run react-start
	# electron should be started in monitor terminal
}

start_main_event(){
	cd $SHELL_PATH/$HARDWARE_PATH
	export GOOGLE_APPLICATION_CREDENTIALS="./$GCP_KEY"
	python3 event_listener.py
	# python3 event_listener.py --mode call 
}
start_streaming(){
	cd $SHELL_PATH/$HARDWARE_PATH/$STREAMING_PATH
	python3 camera_stream.py
}

start_backend > $SHELL_PATH/server_log.log &
start_frontend > $SHELL_PATH/front_log.log &
start_main_event > $SHELL_PATH/hardware_log.log &
start_streaming
echo "start everything" 
