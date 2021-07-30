# SQLD
### 관계형데이터 용어
Row : 가로행
Column : 세로행
Field : 둘의 교차점

정규화 : 데이터의 정합성을 확보하고, 불필요한 중복을 줄이는 프로세스
기본키 : 각 행을 특정할 수 있는 필드값을 갖는 칼럼 명
외부키 : 다른 테이블의 기본키로 사용되고 있는 관계를 연결하는 칼럼


ERD(Entity Relationship Diagram) : 테이블간의 상관관계를 그림으로 도식화 한 것
Information Engineering 표기법과 Barker 표기법으로 표현함

까마귀발 : N을 표현
작대기 : 1을 표현
실선 : 식별관계
점선 : 비식별 관계

식별관계 : N테이블에서 1테이블의 키를 primary key로 추가로 받는 방식.
비식별관계 : N테이블에서 1테이블의 키를 외래키로 받는 방식.


ANSI : American National Standards Institute(미국 국가 표준 협회)
ISO : (유럽 표준 단체)

# 테이블 자료형
CHARACTER : 고정 문자
VARCHAR2 : 가변 문자
NUMERIC : 숫자
DATETIME : 날짜

# 데이터베이스 명령어
### CREATE TABLE
**컬럼명 규칙**
벤더 길이에 한계가 있음.
문자로 시작해야됨.
알파벳, 숫자, _$#만 허영됨
기본적으로 테이블, 컬럼명은 대문자로 만들어짐.

**형식**
CREATE TABLE [TABLE NAME] (
        [COLUME_NAME] [COLUME_TYPE] [COLUME_LEVEL_CONSTRAINT],
        CONATRAINT [COLUME_NAME] [TABLE_LEVEL_CONSTRAINT]
)

**TABLE_LEVEL_CONSTRAINT 옵션**
PRIMARY_KEY
UNIQUE_KEY
NOT NULL
CHECK : (입력할 수 있는 범위를 제한함. TURE/FALSE 결과가 나오는 논리식 지정)
FOREIGN KEY

**생성된 테이블 확인**
ORACLE : DESCRIBE TABLE_NAME

**CTAS**
CREATE TABLE AS SELECT
- 기존 테이블의 제약조건중 NOT NULL만 살아남게됨

### ALTER TABLE
- 테이블의 CONSTRAINT나 SCHEMA를 변경



**ALTER TABLE** [TABLE NAME] **ADD** ([COLUME_NAME] [COLUME_TYPE])
**ALTER TABLE** [TABLE NAME] **DROP COLUME** ([COLUME_NAME])
**ALTER TABLE** [TABLE NAME] **MODIFY** ([COLUME_NAME] [COLUME_TYPE] [DEFAULT] [CONTRAINTS])
- 테이블에 값이 있으면 컬럼의 크기를 눌일 수 없음
- 컬럼에 NULL 이 있을 경우 NOT NULL을 적용할 수 없음.

**ALTER TABLE** [TABLE NAME] **RENAME COLUME** [COLUME_NAME] **TO** [COLUME_NAME]
- ORACLE과 일부 DB만 지원

**ALTER TABLE** [TABLE NAME] **DROP CONSTRAINT** [COLUME_NAME] [TABLE_LEVEL_CONSTRAINT]
**ALTER TABLE** [TABLE NAME] **ADD CONSTRAINT** [COLUME_NAME] [TABLE_LEVEL_CONSTRAINT]

### RENAME TABLE
RENAME [TABLE_NAME] TO [TABLE_NAME]

### TRUNCATE TABLE
테이블 내에 있는 행들을 제거하고 재사용 가능하도록 함.
**TRUNCATE TABLE** [TABLE_NAME]

# DML
**INSERT INTO** [TABLE_NAME] ( COLUME_NAME_LIST) **VALUES** (VALUE_LIST)
- CHAR, VARCHAR 에 들어갈 값들은 '으로 감싸준다
- LIST 원소간에는 ,로 구분해준다

**UPDATE** [TABLE_NAME] **SET** [COLUME_NAME] **=** [VALUE]
**DELETE FROM** [TABLE_NAME]

### DDL과 DML의 차이
> **ORACLE의 경우**
>DDL의 경우 AUTO COMMIT된다.
DML의 경우, 조작하려는 테이블을 모두 버퍼에 올려놓고 작업하기 때문에 실시간으로 영향을 미치지는 않는다.
DML을 완료하기 위해서는 COMMIT으로 TRANSACTION을 종료해야한다.
**SQL SERVER**
DML도 오토커밋된다.
#
**SELECT** [COLUME_NAME] **AS** [ALIAS], **FROM** [TABLE_NAME]
- LIST는 반점으로 구분
- COLUNE_NAME과 ALIAS 사이에 띄워쓰기로 구분하기도함.
- ALIAS에 공백이 있을 경우 "로 감싸줌
- COLUME_NAME 간에 ,이 아니라 ||로 감싸주면 문자열들을 연결해서 보여줄 수도 있음.

**WHERE**
- WHERE이 없는 FULL TABLE SCAN은 SQL 튜닝의 1차 검토 대상이 된다.
- COLUME_NAME LOGICAL_OPERATOR (NUMBER, EXPRESSION) 


**SELECT문 동작 순서**
- WHERE의 조건절이 먼저 적용되고, 조건에 맞는절들이
GROUP BY의 적용 대상이 된다. 그다음 결과에 맞는 집합의 행이 
HAVING으로 그룹화된 행에서 조건에 맞는 내용만 보여줌

# DCL
DCL은 DML문으로 이루어진 작업들을 TRANSACTION 단위로 관리한다.
DCL의 성격 네가지
**COMMIT**
- SQL문의 결과를 데이터베이스에 반영시키는 것이 COMMIT

**ROLLBACK** 
- 트랜잭션 시작 이전의 상태로 되돌리는 것을 ROLLBACK
**SAVEPOINT**
**ROLLBACK TO** [SAVE_POINT_NAME]
- 세이브 포인트로도 롤백할 수 있음.
- 
# 함수
1. 날짜형 함수
    | 함수                                   | 내용                                    |
    | -------------------------------------- | --------------------------------------- |
    | SYSDATE                                | 현재 날짜                               |
    | EXTRACT("YEAR"\|'MONTH'\|'DAY' from d) | 날짜 데이터에서 년 월 일 데이터 추출    |
    | TO_NUMBER(TO_CHAR(d, "yyyy"))          | 문자로 추출된 날짜 데이터를 숫자로 변경 |
2. 변환형 함수
   1. 명시적 함수와 암시적함수. 명시적인 데이터 유형 변환을 사용하는 것이 좋다,
   2. CAST와 CONVERT(대충함)
3. NULL함수
    | 함수                          | 내용                                                   |
    | ----------------------------- | ------------------------------------------------------ |
    | NVL(EXPR1, EXPR2)             | EXPR1가 NULL일 경우 EXPR2를 반환                       |
    | NULLIF(EXPR1, EXPR2)          | EXPR1과 EXPR2가 같으면 NULL, 다르면 EXPR1              |
    | COALESCE(EXPR1, EXPR2, EXPR3) | 앞에서 부터 순차적으로 NULL이 아닌걸 리턴. 없으면 NULL |

**GROUP BY, HAVING**
- GROUPBY에서는 ALIAS를 사용할 수 없음.
- WHERE절에서는 집계함수를 사용할 수 없음. 그룹화가 되기 전에 적용되기 때문이다.
- 그룹화가 이뤄진 후 HAVING 조건에 맞는 내용만 출력된다.

#집계함수와 NULL
# CASE 표현
(SELECT 에서 표현할 칼럼에서)
**CASE** [COLUME_NAME] **WHEN** [EXPR] **THEN** [EXPR] **END**
**CASE** **WHEN** [COLUME_NAME] **THEN** [EXPR] **ELSE** [EXPR] **END**
### 원칙        
- 원자성
  - 트랜잭션 내의 커맨드는 전부 실행되거나 전부 실행되지 않아야됨.
- 일관성
  - 트랜잭션 전에 문제가 없었다면, 그 후에도 문제가 없어야함.
- 고립성
  - 트랜잭션간에 서로 영향을 주면 안됨
- 지속성
  - 트랜잭션이 수행되면 갱신된 데이터베이스는 지속적으로 유지되어야함



