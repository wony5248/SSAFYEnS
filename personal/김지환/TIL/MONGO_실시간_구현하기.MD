1. ​
2. mongoDB 데이터 실시간 반영처리하기
   1. Oplog tailing
      1. oplog는 mongodb의 마스터 노드에 요청되는 연산들의 로그파일이다. local db의 oplog.rs에 기록되는 내용으로 이벤트 처리가 가능했다.
      2. https://cinema4dr12.tistory.com/494
   2. Fail Over란
      1. 장애극복기능. 시스템에 이상이 생겼을 때 예비 시스템으로 자동 전환되는 기능이다.
   3. 클러스터링과 리플리케이션의 차이
      1. https://mangkyu.tistory.com/97
   4. change streams을 사용하기 위해서는 primary secondary 구조 형성을 위한 replica set이 있어야함.
      1. replica set을 만들기 위해서는 mongod.cnf를 수정해야함(window)
      2. https://docs.mongodb.com/manual/reference/configuration-options/
   5. replicaset 구성하기
      1. https://rastalion.me/mongodb-replica-set-%EA%B5%AC%EC%84%B1%ED%95%98%EA%B8%B0/
   6. window에서 mongod 환경변수 설정하고 연동하기
      1. https://javacpro.tistory.com/64
   7. https://mongoosejs.com/docs/3.8.x/docs/connections.html
   8. 리눅스 프로세스 확인하기   
      1. ps -fC mongod
   9. 몽고디비에 레플리카 세팅하기
      1.  https://sudarlife.tistory.com/entry/window-%EB%A1%9C%EC%BB%AC-%ED%99%98%EA%B2%BD%EC%97%90-mongoDB-replSet-%EC%85%8B%EC%97%85%ED%95%98%EA%B8%B0