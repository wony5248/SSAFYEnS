## HowToSwagger

### 20210726

> 주말 동안 한 내용 기반으로 협의

#### Swagger에 대한 공부

- Swagger라는 서비스가 2.0 버젼까지 운영되었으며 이후 3.0으로 업그레이드하며 openAPI 라는 오픈소스재단으로 기부되었음. 
- Swagger Editor == openAPI specification
- 처음에 시작한 Swagger 문서는 OAS 2 버젼으로 시작하였음.
- https://swagger.io/docs/specification/2-0/what-is-swagger/
- 스웨거(정확히는 openAPI) 쓰세요! 라고 하는 컨퍼런스 유튜브 영상과 관련 자료
  - https://youtu.be/J4JHLESAiFk
  - https://drive.google.com/file/d/1ZrP6yBdGJTDXZuX67TU0aVaSrF_AgQe6/view
  - [./OpenAPI-Specification.pdf](./OpenAPI-Specification.pdf)

#### Swagger로 API 설계

- DB 기준이 아니라 프론트엔드에서 페이지 변할때마다 하나의 요청만 하게 생각
  - 협의결과 페이지당 API 하나만 요청가도록 하고, modal 등 페이지에서 연결되는 경우에는 별도 API 요청 없어도 되는 경우도 있을 것.
  - DB 기준이 아니라 와이어프레임 기준으로 API를 만들고, 이에 맞춰서 DB를 바꿔나가기로 합의.
  - GET 요청시에 쿼리를 정리해서 주는 것 보다는, POST/PUT/DELETE 요청시에 DB에 반영해서 정리하여 GET 요청시에 빠르게 받아갈 수 있게 하자
  - API를 설계하고 다시 DB/ERD 설계한다고 생각
- post / put 를 업데이트할때 어떻게 나눌까
  - post는 생성, put은 업데이트.
  - PUT은 GET 이후에 대부분 이루어지므로 JSON은 전부 넣는 걸로?
- 하... openAPI(OSA 3)로 할껄
  - 여태까지 [swagger 2.0으로 진행](./swaggerEditor2.0)함
  - 보여주고 openAPI로 변환 생각 중
  - 기능상 제한사항이 조금 있음
  - 컴포넌트 구조를 사용함
  - 공식문서의 내용이 부실함(sunset 버젼의 숙명ㅠ)
- 얼마나 자세히 작성할 것인가
- M:N 테이블은 어떻게 표현? 모두 하나의 요청 object에 종속되도록?
  - 예.
- response는 밑에 있는 models(definitions)와 동일하도록 하여 `$ref` 로 접근할 수 있게

추가

- 2개 이상 상속 받기 https://github.com/OAI/OpenAPI-Specification/issues/1467

