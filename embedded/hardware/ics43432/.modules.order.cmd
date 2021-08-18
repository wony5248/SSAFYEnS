cmd_/home/pi/ssafyens/ics43432/modules.order := {   echo /home/pi/ssafyens/ics43432/ics43432.ko; :; } | awk '!x[$$0]++' - > /home/pi/ssafyens/ics43432/modules.order
