# Sequelize 조사

### 용어

**ORM** : Object-Relational Management의 약자로, MySQL, MsSQL 등 등의 데이터베이스와 데이터베이스 안의 테이블을 프로그래밍 할 때 객체 처럼 쓸 수 있게 해주는 방식입니다. 

ORM을 사용하면 어플리케이션에서 쿼리문을 사용하지 않고 프로그래머에게 친숙한 명령어 방식으로 데이터베이스를 제어할 수 있습니다.



**Migration** : 해석을 위해 관련 문서를 참조했는데, Sequelize보다 [Django](https://docs.djangoproject.com/en/3.2/topics/migrations/) 문서 설명이 더 알기 쉬운 것 같습니다.

쟝고에서 설명하는 마이그레이션은, 모델에 대한 변경 사항을 데이터 베이스 스키마로 전파하는 방법이라고 합니다.

**Models**  : 

> [Django](https://docs.djangoproject.com/en/3.2/topics/db/models/A )
>
> model is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you’re storing. Generally, each model maps to a single database table.
>
> 모델은 데이터에 대한 정보의 확실한 단일 소스입니다. 여기에는 저장 중인 데이터의 필수 필드와 동작이 포함됩니다. 일반적으로 각 모델은 단일 데이터베이스 테이블에 매핑됩니다.

This example model defines a `Person`, which has a `first_name` and `last_name`:

이 예제 모델은 first_name과 last_name을 가지는 Person을 정의합니다.

```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
```

데이터의 속성값을 가지는 객체가 Models인 것 같습니다. Schema와 유사한 개념으로 생각됩니다.



>  [Sequelize](https://sequelize.org/master/class/lib/model.js~Model.html)
>
> # Model
>
> A Model represents a table in the database. Instances of this class represent a database row.
>
> 모델은 테이블의 이름을 나타냅니다. 이 클래스의 인스턴스는 데이터베이스의 **행** 을 나타냅니다

 시퀄라이즈에서는 테이블의 이름을 나타낸다고 하니 정말 Schema와 유사한 것 같습니다. 근데 왜 행일까요..? 제 머릿속의 2차원 데이터 테이블에서는 행이 instance, 열이 field인데...??

**Sequelize** : 

Node.js에서 사용하는 ORM입니다.

 MariaDB, SQLite, MsSQL을 지원한다고 합니다.

어플리케이션을 실행하지 않고도 [Sequelize-cli](https://github.com/sequelize/cli) 로 데이터베이스를 관리할 수 있으며, 기본적인 틀도 만들어 줍니다.



# 기능 조사 

 저희 팀은 성능 향상을 위해 noSQL을 도입할지, 기존의 MySQL을 도입할할지 고민하고 있었습니다. 만약 Sequelizer에서 Django ORM처럼 Back reference가 제공된다면 성능의 문제로 noSQL을 사용하지 않아도 됬습니다. 

 sequelize document에 [beLongTo ](https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html) 클래스로로 한 테이블의 id를 다른 테이블의 속성으로 추가하는 기능이 있었는데, 를, back reference가 가능한지 조사했습니다.



#### belongTo 예:

```
Profile.belongsTo(User) 
// This will add userId to the profile table
```

User 테이블의 Id를 Profile 테이블에 추가한다고 적혀있다.

Profile에  User의 Id를 외래키 속성으로 추가해 참조할 수 있도록 한 것 같다.

 이는 한 테이블에서 다른 테이블의 id를 여러개 갖게 함으로써 쿼리 성능을 향상하기 위한 우리의 목적에 맞지 않았다.



[BelongsToMany](https://sequelize.org/master/class/lib/associations/belongs-to-many.js~BelongsToMany.html)

```js
Return:
BelongsToMany
Example:
// Automagically generated join model
User.belongsToMany(Project, { through: 'UserProjects' })
Project.belongsToMany(User, { through: 'UserProjects' })

// Join model with additional attributes
const UserProjects = sequelize.define('UserProjects', {
  started: Sequelize.BOOLEAN
})
User.belongsToMany(Project, { through: UserProjects })
Project.belongsToMany(User, { through: UserProjects })
public static build(values: object | Array, options: object): Model | Array<Model>
```





# 설치

```bash
	$ npm install --save sequelize
```



### 참고자료

[1]: https://sequelize.org/master/manual/migrations.html

| 이름                         | 링크                                       |
| -------------------------- | ---------------------------------------- |
| 마이그레이션과 Sequelize-cli 튜토리얼 | [링크](https://medium.com/prisma-korea/%EB%B2%88%EC%97%AD-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98%EA%B3%BC-sequelize-cli-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC-3926c0a9eae6) |
| Sequelize                  | [링크](https://sequelize.org/master/index.html) |
| belongTo와 hasOne 차이        | [링크](https://wooooooak.github.io/node.js/2018/08/22/sequelize1%EB%8C%801/) |
|                            |                                          |
|                            |                                          |
|                            |                                          |
|                            |                                          |
|                            |                                          |
|                            |                                          |

