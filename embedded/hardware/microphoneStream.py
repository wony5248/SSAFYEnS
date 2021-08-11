import pyaudio
import queue
import time

# 음성데이터 스트림
class MicrophoneStream(object):
    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk
        self._buff = queue.Queue()  # 마이크로 입력받은 오디오 데이터를 chunk 단위로 queue에 저장한다.(thread-safe buffer)
        self.closed = True  # audio스트림 열려있는지 닫혀있는지

    # 클래스 생성 (스트림 시작)될 때
    # 파이썬 context manager 사용
    # 실행 중 문제가 발생해도 오디오 장치를 제대로 닫게 하기 위함
    def __enter__(self):
        # pyaudio 데이터 스트림 열기
        print("Stream open")
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            # pyaudio.open()은 pyaudio.Stream object를 리턴.
            format=pyaudio.paInt16,  # 16bit 다이나믹 레인지
            channels=1,  # mono
            rate=self._rate,  # sampling rate
            input=True,  # 마이크로부터 입력되는 스트림임 명시
            frames_per_buffer=self._chunk,
            stream_callback=self._fill_buffer,  # 버퍼가 chunk만큼 꽉 찼을 때 실행할 콜백함수 등록(non - blocking)
        )
        self.closed = False
        return self

    # 스트림 끝날 때
    def __exit__(self, type, value, traceback):
        print("Stream over")
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        self._buff.put(None)
        # 끝날 때 반드시 pyaudio 스트림 닫기
        self._audio_interface.terminate()

    # 버퍼 찼을 때 콜백함수. pyaudio.Stream에서 호출되는 콜백은 4개 매개변수 갖고, 2개값 리턴한다. pyaudio문서 참고.
    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        self._buff.put(in_data)  # data를 queue에 넣기
        return None, pyaudio.paContinue

    # python generator, 한 라운드의 루프마다 현재 버퍼의 내용을 모아서 byte-stream을 생산함.
    def generator(self):
        while not self.closed:
            # Use a blocking get() to ensure there's at least one chunk of data
            # and stop iteration if the chunk in None, indicating the end of the audio stream
            chunk = self._buff.get()  # 큐에서 데이터 가져오기
            if chunk is None:
                return
            # 큐에 더이상 데이터가 없을 때 까지 data에 이어붙임
            data = [chunk]
            while True:
                try:
                    # 가장 오래된 데이터부터 순차적으로 data[]에 추가함
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except queue.Empty:
                    break

            yield b''.join(data)  # byte-stream
