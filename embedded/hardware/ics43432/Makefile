obj-m := ics43432.o
all:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) modules
clean:
	make -C /lib/modules/$(shell uname -r)/build M=$(PWD) clean
install:
	sudo cp ics43432.ko /lib/modules/$(shell uname -r)
 	# depmod : 모듈의 dependency 관계를 표로 작성함. modules.dep 파일
	sudo depmod -a

