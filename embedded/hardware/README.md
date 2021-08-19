# Hardware
## Circuits
![circuit](https://user-images.githubusercontent.com/48985445/130106401-42e9dfe2-af3f-44af-8735-79329b1f5a94.png)
> 추가로 카메라 모듈이 연결되어 있습니다.

## Modules
* [DHT11](https://lab.ssafy.com/s05-webmobile3-sub3/S05P13A109/-/blob/master/personal/%EC%8B%A0%EC%9D%80%EC%A7%80/datasheets/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf)
* [KY-037](https://lab.ssafy.com/s05-webmobile3-sub3/S05P13A109/-/blob/master/personal/%EC%8B%A0%EC%9D%80%EC%A7%80/datasheets/KY-037.pdf)
* [MCP3008 ADC](https://lab.ssafy.com/s05-webmobile3-sub3/S05P13A109/-/blob/master/personal/%EC%8B%A0%EC%9D%80%EC%A7%80/datasheets/mcp3008.pdf)
* [CDS 센서(조도센서)]()
* [Adafruit max98357](https://lab.ssafy.com/s05-webmobile3-sub3/S05P13A109/-/blob/master/personal/%EC%8B%A0%EC%9D%80%EC%A7%80/datasheets/adafruit-max98357-i2s-class-d-mono-amp.pdf)
* [Adafruit I2S MEMS Microphone](https://lab.ssafy.com/s05-webmobile3-sub3/S05P13A109/-/blob/master/personal/%EC%8B%A0%EC%9D%80%EC%A7%80/datasheets/adafruit-i2s-mems-microphone-breakout.pdf)
* [RaspberryPi Camera Module V2](https://www.raspberrypi.org/products/camera-module-v2/)


## Testcodes
```
python3 ./testcodes/test_{sensor}.py
```
> 구글 클라우드 관련 테스트 코드는 key 파일과 credential 등록이 꼭 필요합니다!
>
> [Key 얻기](./GET_GOOGLE_KEY.md)  
> key 파일은 실행할 파이썬 파일과 동일한 위치에 복사해 주세요.
  
    ```
    # 키 쉘에 등록하기
    cd ./testcodes
    export GOOGLE_APPLICATION_CREDENTIALS="./xxxxxx-xxxxxxx.json"
    ```

# Software
## 구현된 기능
1. STT 음성 인식
    1. `default`: 버튼 눌러 STT 실행
    2. `--mode call`: `싸피엔스` 로 불러서 STT 실행
    3. 등록/조회/수정/삭제/완료 기능 구현
2. TTS 음성 출력
    1. 각 커맨드마다 DB와 상태에 맞는 음성 출력
3. 서버 통신 : Node API 이용해서 DB에서 데이터 가져오기
4. 센서 값 주기적으로 읽어서 서버에 전송
5. 알림 기능: 서버에서 Notification 올 때 음성 출력
6. OpenCV로 Object Detection
7. 카메라 스트리밍


## TODO
* 카메라 스트리밍 프레임에 OpenCV 적용하기(6+7..)
* 집중 방해 물질 감지시 알림 보내기
