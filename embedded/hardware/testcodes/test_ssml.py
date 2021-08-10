def synthesize_ssml(ssml):
    from google.cloud import texttospeech

    client = texttospeech.TextToSpeechClient()
    input_text = texttospeech.SynthesisInput(ssml=ssml)

    voice = texttospeech.VoiceSelectionParams(
        language_code="ko-KR",
        name="ko-KR-Wavenet-A",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16
    )

    response = client.synthesize_speech(
        input=input_text, voice=voice, audio_config=audio_config
    )

    with open("output.wav", "wb") as out:
        out.write(response.audio_content)
        print('Audio content written to file "output.wav"')


ssml_break = """
<speak>
멈출 수 있어요. <break time="2s"/> 아이쿠 끝났어요.
</speak>
"""
ssml_order = """
<speak>
  <say-as interpret-as="ordinal">1</say-as>
</speak>
"""
# 1 -> 첫번째, 로 나옴
ssml_date = """
<speak>
  <say-as interpret-as="date" format="yyyymmdd" detail="1">
    2021-08-03
  </say-as>
  <say-as interpret-as="date" format="mmdd" detail="1">
    08-03
  </say-as>
</speak>
"""
# yyyymmdd -> 2021년 8월 3일
# mmdd -> 8월 3일
ssml_time = """
<speak>
  <say-as interpret-as="time" format="hms12">0:0</say-as>
  <say-as interpret-as="time" format="hms12">1:30</say-as>
</speak>
"""
# 12 하면 그냥 12시간 기준으로 말해줌
# 근데 12하고 pm am 붙이면 24시간 기준으로 변환해서 말해줌
# 12 5:30pm 과 24 17:30은 동일하게 십칠시 삼십분
ssml_audio = """
<speak>
안녕
  <audio src="output.mp3">
    <desc>test</desc>
  </audio>
세상
</speak>
"""
# 오디오는 에러 남

synthesize_ssml(ssml_time)
