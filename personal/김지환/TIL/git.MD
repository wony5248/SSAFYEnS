파일을 만들고 git add를 하면 
2가지가 수행됨.
1. 내용을 해싱된 결과를 object name으로 갖는 파일이 obejct 디렉토리에 생성됨
2. 1.에서 생성된 파일의 Object name - 파일명 정보가 index파일에 추가됨.

add된 파일들을 commit을 하면 commit 내역이 object 파일로 저장됨.
obejct파일에는 tree에 대한 정보가 저장되어있음
tree에는 생성되었던 파일들의 object 명이 저장되어있음.

생성된 파일을 수정해서 add하면 index파일에 적혀있는 파일들의 shh값들이 변경됨.

커밋을 한번 더하면 이번 커밋에는 parent와 tree가 있음.

# Object의 세가지 종류
1. commit
   1. tree와 parent를 가짐
2. tree
   1. add된 파일들의 object name을 가지고있음. 디렉토리 파일도 tree
3. Object
   1. add된 파일들의 해쉬값을 가짐. 추가된 add 파일.


# 네 가지 저장소
1. working directory(그냥파일) => add
2. staging area(index와 object파일이 생성된 상태) => commit
3. local repository => push
4. remote repository

# status
index와 최신 commit 파일의 tree상태가 다르다는것은, 변경된 파일이 add되어 commit을 기다리는 상태라는 뜻.
1. 커밋 후의 index는 최신 커밋의 트리상태와 같음.
2. add 명령어가 실행되면 index가 수정되어 커밋의 트리상태와 달라지게됨
3. status => index에서 modified, and staged

# branch
1. git log
   1. --branches
      1. 모든 로그들의 브랜치를 보여줌. 커밋내역이 어느 브랜치의 것인지 모르기때문에 decorate와 사용.
   2. --decorate
   3. --g
      1. 브랜치 분기 상태를 보여주는 그래프를 제공
   4. --no-page
   5. --oneline
   6. git log exp master
      1. master에는 있고 exp에는 없는것들만 보여줌
      2. -p를 추가하면 파일 변경 내역도 볼 수있음
      3. https://opentutorials.org/course/2708/15261 (10:01)
2. 원리
   1. git init을 하면 .git에는 heads파일이 있음.
   2. commit을 하면 refs/heads/master가 생성되며, 그안에는 방금 커밋한 object name이 있음.
   3. heads에는 ref: refs/heads/master라는 내용이 담김.
   4. git log를 수행했을때 내부적인 동작
      1. heads에 적힌 브랜치를 확인
      2. 브랜치가 가리키는 커밋의 tree확인
3. git marge
   1. [](./git/branch1.png)
   2. 여기서 master에 exp의 변경사항들을 합치는 방법
      1. git checkout master
      2. git merge exp
   3. fast foward
      1. 공통 자식 커밋을 생성해 master branch가 가리키는 커밋을 exp 브랜치가 가리키는 커밋으로 만든다. 아무 수정없이!
   4. recurcive stategy
      1. 두 브랜치의 공통 부모간에 서로다른 커밋이 있으면 fast foward할 수 없음.
      2. 이 상태에서 merge를 하게 되면 두 브랜치가 가리키는 커밋을 동시에 parent로 갖는 merget commit이라는 새로운 형태의 커밋을 생성함.