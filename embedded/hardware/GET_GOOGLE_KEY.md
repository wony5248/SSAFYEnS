# How To Get GOOGLE CREDENTIAL KEY
1. 구글 계정 로그인
2. [구글 클라우드 플랫폼](https://cloud.google.com/) 가입 혹은 기존 구글 계정 로그인
3. 우상단 [콘솔창](https://console.cloud.google.com/home/dashboard) 접속
4. 새 프로젝트 생성  
    - ![select-pjt](https://user-images.githubusercontent.com/48985445/130017069-27188b1d-8dc6-4fb1-99bc-872920b76b5e.png)
5. 프로젝트 이름 입력 및 생성
    - Organization 적지 않아도 됨
6. 4번의 모달 창에서 5번에서 만든 프로젝트 선택
7. 콘솔 창 > `API 및 서비스` > `라이브러리` 클릭
8. 머신러닝 > `Cloud Speech-to-Text API` 선택 및 Enable
9. 'Cloud Text-to-Speech API' 검색 > 선택 및 Enable

> 여기서부터 중요!

10. `Service account Key` 생성
    1. 콘솔 창 > `API 및 서비스` > `사용자 인증 정보` 클릭
    2. `사용자 인증 정보 만들기` > `서비스 계정`
        * ![service-account](https://user-images.githubusercontent.com/48985445/130018056-17e35864-6c61-41af-b0f8-e77897222434.png)
    3. 계정 이름/설명 작성 후 생성
    4. 액세스 권한 설정
        * ![access](https://user-images.githubusercontent.com/48985445/130018387-09ee9f9d-ca08-44ee-b575-cf4e756ede1f.png)
    5. `사용자 인증 정보` > 방금 만든 프로젝트 선택
    6. `키` > `키 추가` > `새 키 생성`
        * ![create_key](https://user-images.githubusercontent.com/48985445/130018697-3a420b47-f71f-438a-a350-97e4e72aa096.png)
    7. 키 유형 `json` 선택
    8. 다운로드된 json 파일 raspberrypi로 이동
        * 콘솔 창에서 다음 명령어 실행 (Windows/Mac 호환)
        ```
        scp {download_dir}/xxxxxx-xxxx.json pi@{rpi-ip}/{git_clone_dir}/S05P13A109/embedded/hardware
        ```

# Edit GOOGLE CREDENTIAL KEY Setting!!(required)
```
nano ~/S05P13A109/embedded/device_start.sh
GCP_KEY 변수에 다운로드한 json 파일명 수정
# 예시
# GCP_KEY='ssafy-pjt1-320605-a257c90a81c8.json'
```
