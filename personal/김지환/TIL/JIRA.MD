# Jira 설정하기
1. 이슈생성 [S05P1A1092-4]
   1. 하위 Task 생성 [S05P1A1092-5]
# Jira 와 gitLab 연동하기
1. gitLab의 Setting에서 Intergration에서 Jira와 연동하기
   1. base url에는 http://ssafy.gitlab.com
   2. 이메일에는 내 닉네임인 bure5kzam을 입력했음.
      1. ~~transition ID는 없어서 입력하지 않음~~
         1. 내용중 Transition Jira issues.. 하는 설정이 있어 31로 설정.
   3. password은 비밀..
2. 내용 수정 (TIL.MD) 후 커밋
   1. Jira와 연동하면 commit한 message 내용으로 지라를 동작시킬 수 있음.
      1. 메세지 포맷 1
         1. Resolves [proejct name]-[issue number]
         2. Closes [proejct name]-[issue number]
         3. Fixes [proejct name]-[issue number]
      2. 메세지 포맷 2
         1. [project name]-[issue number] / [contents]
         2. gitlab에 남은 커밋이력에서 jira 이슈로 바로 넘어갈 수 있음.
   2. 커밋 메세지 2 시도
      1. git add .
      2. git commit -m "S05P1A1092-5 / Test"
      3. 결과
         1. S05P1A1092-5의 Comments에 커밋 내역이 추가됨.
   3. 커밋 메세지 1 시도
      1. git add . && git commit -m "Resolves S05P1A1092-5"
      2. 결과
         1. issue의 Status 상태가 done으로 변경됨.
   4. 유의사항
      1. Jira는 gitlab의 default branch를 인식해 제어한다.
      2. == gitlab의 default branch의 커밋 메세지로 제어된다.