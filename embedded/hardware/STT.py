import re, sys, os
from google.cloud import speech
from microphoneStream import *
import function

CUR_DIR = os.path.dirname(os.path.realpath(__file__))
RATE = 48000
CHUNK = int(RATE / 10)
SEQUENCE = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열']

class STT():
    def __init__(self):
        self._rate = RATE
        self._chunk = int(self._rate / 10)
        self.language_code = 'ko-KR'
        self.client = None
        self.config = None
        self.streaming_config = None
        self.stream = None
        self.settings_init()
        # 타이머 추가해서 일정 시간 안에 이동 못하면 취소 기능 추가?

    def settings_init(self):
        self.client = speech.SpeechClient()
        self.config = speech.RecognitionConfig(
            encoding='LINEAR16', # enums.RecognitionConfig.AudioEncoding.LINEAR16
            sample_rate_hertz=self._rate,
            max_alternatives=1,
            language_code=self.language_code
        )
        self.streaming_config = speech.StreamingRecognitionConfig(
            config=self.config,
            interim_results=True
        )
        print("Preparing for STT...")

    def listening_loop(self, responses, cmd, seq = None):
        print("Listening...")
        num_chars_printed = 0
        transcript = ''
        for response in responses:
            if not response.results:
                continue
            result = response.results[0]
            if not result.alternatives:
                continue
            transcript = result.alternatives[0].transcript
            overwrite_chars = ' ' * (num_chars_printed - len(transcript))

            if not result.is_final:
                sys.stdout.write(transcript + overwrite_chars + '\r')
                sys.stdout.flush()
                num_chars_printed = len(transcript)
                print(transcript)
                if re.search(r'\b(그만)\b', transcript, re.I) or\
                    re.search(r'\b(멈춰)\b', transcript, re.I) or\
                    re.search(r'\b(끝)\b', transcript, re.I):
                    print('그만: Exiting..')
                    return -1
                if cmd == -1:
                    # return main_cmd
                    if re.search(r'\b(등록)\b', transcript, re.I):
                        print('등록: Exiting..')
                        return 0
                    elif re.search(r'\b(브리핑)\b', transcript, re.I):
                        print('브리핑: Exiting..')
                        return 1
                    elif re.search(r'\b(수정)\b', transcript, re.I):
                        print('수정: Exiting..')
                        return 2
                    elif re.search(r'\b(삭제)\b', transcript, re.I):
                        print('삭제: Exiting..')
                        return 3
                    elif re.search(r'\b(완료)\b', transcript, re.I):
                        print('완료: Exiting..')
                        return 4
                    elif re.search(r'\b(현재)\b', transcript, re.I):
                        print('현재 일정: Exiting..')
                        return 5
                elif cmd == 0:
                    # 등록
                    # 순서는 self.seq 값 필요
                    # 음성 들어오는 거: 1시부터 5시까지
                    if re.search(r'\B(시부터)\b', transcript, re.I) and\
                        re.search(r'\B(시까지)\b', transcript, re.I):
                        strr = transcript
                        start = None
                        finish = None
                        loc_start = strr.find('시부터')
                        try:
                            if loc_start >= 2:
                                start = chg1 = int(strr[loc_start-1])
                                start = chg2 = int(strr[loc_start-2:loc_start])
                        except:
                            if start is None:
                                os.system(f'aplay {CUR_DIR}/tts_wav/i_dont_understand.wav')
                                return 0
                        loc_finish = strr.find('시까지')
                        try:
                            if loc_finish >= 2:
                                finish = chg1 = int(strr[loc_finish-1])
                                finish = chg2 = int(strr[loc_finish-2:loc_finish])
                        except:
                            if finish is None:
                                os.system(f'aplay {CUR_DIR}/tts_wav/i_dont_understand.wav')
                                return 0
                        # default: 오후
                        if '오전' not in strr:
                            start = start + 12
                            finish = finish + 12
                        if start >= 24 or finish >= 24:
                            os.system(f'aplay {CUR_DIR}/tts_wav/add_schedule_over_midnight.wav')
                            return -1
                        function.add_data('date')
                        function.add_data('started_at', value=start)
                        function.add_data('finished_at', 'deadline_at', value=finish)
                        print('시간 등록: Exiting..')
                        return 1
                    elif re.search(r'\b(일정)\b', transcript, re.I) and\
                        re.search(r'\b(이름)\b', transcript, re.I):
                        strr = transcript
                        strr = strr.replace("일정", "", 1)
                        strr = strr.replace("이름", "", 1)
                        function.add_data('title', content=strr)
                        print('일정 이름 등록: Exiting..')
                        return 2
                    elif re.search(r'\b(아니)\b', transcript, re.I) or\
                        re.search(r'\b(됐어)\b', transcript, re.I) or\
                        re.search(r'\b(괜찮아)\b', transcript, re.I):
                        print('일정 내용 등록 안 함: Exiting..')
                        return 3
                    elif re.search(r'\b(일정)\b', transcript, re.I) and\
                        re.search(r'\b(내용)\b', transcript, re.I):
                        strr = transcript
                        strr = strr.replace("일정", "", 1)
                        strr = strr.replace("내용", "", 1)
                        function.add_data('context', content=strr)
                        print('일정 내용 등록: Exiting..')
                        return 4
                    # else:
                    #     os.system('aplay /home/pi/ssafyens/speech-test/i_dont_understand.wav')
                    #     return seq
                    # else 처리시 and 조건문에서 뻑남

                elif cmd == 2:
                    # 수정
                    # 음성 들어오는 거 : 두 번째 세 번째 다섯 번째
                    # if re.search(r'\B(번째)\b', transcript, re.I) or\
                    if re.search(r'\b(번째)\b', transcript, re.I):
                        strr = transcript
                        loc = strr.find('번째')
                        success = False
                        if loc >= 2 and strr[loc-2] in SEQUENCE:
                            idx = SEQUENCE.index(strr[loc-2])
                            success = function.pick_data(idx)
                        elif loc >= 3 and strr[loc-3:loc-1] in SEQUENCE:
                            idx = SEQUENCE.index(strr[loc-3:loc-1])
                            success = function.pick_data(idx)

                        if not success:
                            os.system(f'aplay {CUR_DIR}/tts_wav/no_selected_schedule.wav')
                            return 0

                        print('몇번째 일정 변경: Exiting..')
                        return 1
                    # 음성 들어오는 거: 3시간
                    elif re.search(r'\B(시간)\b', transcript, re.I):
                            strr = transcript
                            loc = strr.find('시간')
                            hour = None
                            try:
                                if loc >= 2:
                                    hour = chg1 = int(strr[loc-1])
                                    hour = chg2 = int(strr[loc-2:loc])
                            except:
                                if hour is None:
                                    os.system(f'aplay {CUR_DIR}/tts_wav/i_dont_understand.wav')
                                    return 1
                            success = function.fix_data(hour)
                            if not success:
                                os.system(f'aplay {CUR_DIR}/tts_wav/add_schedule_over_midnight.wav')
                                return -1
                            print('시간 변경: Exiting..')
                            return 2

                elif cmd == 3:
                    # 삭제
                    # if re.search(r'\B(번째)\b', transcript, re.I) or\
                    if re.search(r'\b(번째)\b', transcript, re.I):
                        strr = transcript
                        loc = strr.find('번째')
                        success = False
                        if loc >= 2 and strr[loc-2] in SEQUENCE:
                            idx = SEQUENCE.index(strr[loc-2])
                            success = function.pick_data(idx)
                        elif loc >= 3 and strr[loc-3:loc-1] in SEQUENCE:
                            idx = SEQUENCE.index(strr[loc-3:loc-1])
                            success = function.pick_data(idx)

                        if not success:
                            os.system(f'aplay {CUR_DIR}/tts_wav/no_selected_schedule.wav')
                            return 0

                        print('몇번째 일정 삭제: Exiting..')
                        return 1

            else:
                print(transcript + overwrite_chars)
                if re.search(r'\b(끝)\b', transcript, re.I):
                    print('Exiting..')
                    return -1
                num_chars_printed = 0
        print("listening loop++")

    def open_stream(self,cmd=-1, seq=0):
        # self.client = speech.SpeechClient()
        with MicrophoneStream(RATE, CHUNK) as self.stream:
            audio_generator = self.stream.generator()
            requests = (
                speech.StreamingRecognizeRequest(audio_content=content)
                for content in audio_generator
            )
            responses = self.client.streaming_recognize(self.streaming_config, requests)
            if cmd == -1:
                main_cmd = self.listening_loop(responses,cmd,seq)
                next_cmd = 0
            else:
                main_cmd = cmd
                next_cmd = self.listening_loop(responses,cmd,seq)

            # 멈춰, 끝 등 스트림 종료 처리
            if main_cmd == -1 or next_cmd == -1:
                return False, None, None
            # 아딴 음성 드가서 함수로 처리했을 때의 다음 응답 stt 할지 말지 처리
            repeatition = function.cmd_functions[main_cmd](next_cmd)
            return repeatition, main_cmd, next_cmd

    def start_stt(self):
        print("Starting STT...")
        repeatition, main_cmd, next_cmd = self.open_stream()
        while repeatition:
            print("next step")
            repeatition, main_cmd, next_cmd = self.open_stream(main_cmd, next_cmd)
