const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");

const config = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createGroup = function (req, res, next) {
	return new Promise(async function (resolve, reject) {
		// jwt 인증 확인 필요

    let groupinfo = { ...req.body };

    // 그룹 생성 로직 시작
		db["groups"]
    .create(groupinfo)
    .then((group) => {
      // 이것을 요청한 사람을 첫 회원/관리자로 만든다
      // jsonwebtoken.verify(req.headers["access_token"], config.secret || 'secret', function(err, decoded) {
      //   if (err) return reject(err);
      //   else {
      //     console.log("This is createGroup JWT user_id:",decoded.user_id)
      //     const user_id = decoded.user_id
      //   }
      // });

      console.log("This is createGroup group:", group.toJSON());
      db["users"]
      .findOne({ where: {user_id: 'test1'} }) // JWT
      .then((user) => {
        console.log("This is createGroup user:", user.toJSON());
        group.addUser(user) // 하 직접 SQL안하고 추가할랬더니 너무 어렵네. 여기에 is_group_admin 바꿀 수 있을텐데??
        .then((data) => {
          console.log("This is createGroup group.addUser data:", data)  // toJSON() 안됨
          // 신청자에게 그룹관리자 권한을 부여하기
          // 꼼수로 직접 usersmngroups에 update
          db["usersmngroups"]
          .update(
            { // UPDATE
              is_group_admin: true,
            },
            { // WHERE
              where: {
                user_id: 'test1', // JWT
                group_id: group.group_id,
              },
            }
          )
          .then((data) => {
            console.log("This is createGroup update data:",data)
            return resolve(data)
          })
          .catch((error) => {
            console.log(error)
            return reject(error)
          })
        })
        .catch((error) => {return reject(error);})

        // TEST
        // group.getUsers()
        // .then((users) => {
        //   console.log("This is createGroup GroupInstance.getUsers:",users);
        // })
        // .catch((error) => {
        //   return reject(error)
        // })
        return resolve(group)
      })
      .catch((error) => {
        return reject(error)
      })
      // 그룹 생성 로직 끝
    })
    .catch((error) => {
      return reject(error)
    })
	})
}

exports.checkGroupName = function (req, res, next) {
	return new Promise(async function (resolve, reject) {
		// jwt 인증 확인 필요?

    const search_name = req.body.name

		db["groups"]
    .findAll({where: {name: search_name}})
    .then((groups) => {
      console.log("This is checkGroupName groups.length:",groups.length);
      // 1개 이상이면 true, 0개면 false
      if (groups.length) {
        return resolve({found:true})
      } else {
        return resolve({found:false})
      }
    })
    .catch((error) => {
      return reject(error)
    })
	})
}

exports.getGroupById = function (req, res, next) {
	return new Promise(async function (resolve, reject) {
		// jwt 인증 확인 필요?

    const group_id = req.params.group_id

		db["groups"]
    .findOne({where: {group_id: group_id}})
    .then((group) => {
      // console.log("This is getGroupById group:",group);
      group.getUsers()
      .then((users) => {
        // users.forEach((user) => {
        //   console.log("This is getGroupById group.user1:",user.toJSON());
        // })
        
        console.log("This is getGroupById group.users:",users);
        // users에 하나도 없으면?
        if (users.length) {
          let usersJSON = users.map(user => {
            const { user_id, name, email, cellphone, password, exp, is_admin, created_at, usersmngroups } = user.toJSON()
            const spread = { user_id, name, email, cellphone, password, exp, is_admin, created_at, joined_at: usersmngroups.joined_at, is_group_admin: usersmngroups.is_group_admin }
            return spread
          })
          console.log("This is getGroupById group.users2:",usersJSON);
          const groupJSON = { ...group.toJSON(), members: usersJSON};
          console.log("This is getGroupById groupJSON:",groupJSON);
          return resolve(groupJSON)
        }
        console.log("No user in this group")
        return reject(error)
      })
      .catch((error) => {
        return reject(error)
      })
    })
    .catch((error) => {
      return reject(error)
    })
	})
}

exports.updateGroupById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
      // jwt로 본인이 그룹관리자인 그룹을 수정하고 있는 것인지 확인 필요
    
    const { group_id } = req.params
    // const body = req.body  // 왜인지 모르지만 이걸 통째로 UPDATE문에 넣으면 작동 안 한다
    const { name, context } = req.body
    // console.log(name, context)
    await db["groups"]
    .update(
      { // UPDATE
        name, context
      },
      { // WHERE
        where: {
          group_id: group_id,
        }
      },
    )
    // 업데이트할 instance가 없어도 then으로 갑니다
    .then((data) => {
      db["groups"].findOne({where: { group_id }})
      // 심지어 해당하는 그룹이 없어도 then으로 갑니다
      .then((data) => {
        // 그래서 비어있으면 에러를 보내기로 했습니다
        // 비어있으면 아래 log는 toJSON오류를 일으키기 때문에 반드시 주석처리해야함
        // console.log("This is updateGroupById data:",data.toJSON())
        if (data) return resolve(data)
        else return reject()
      })
      .catch((error) => {
        console.log(error)
        return reject(error)
      })
    })
    .catch((error) => {
      console.log(error)
      return reject(error)
    })
  })
}

exports.deleteGroupById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
    // jwt로 본인이 그룹관리자인 그룹을 삭제하고 있는 것인지 확인 필요
      
    const { group_id } = req.params
    console.log("This is deleteGroupById group_id: ", group_id)
      
    // cascade로 usersmngroups에 group_id있는 것도 모두 삭제되었는지 확인 필요
    // foreignKey 오류발생(junction model 직접 선언시 CASCADE가 아닌 RESTRICT걸리는 것 같음)
    // 꼼수로 먼저 junction instance를 삭제하고 진행
    db["usersmngroups"]
    .destroy({
      where: { group_id }
    })
    .then((data) => {
      // 아무일도 없다 밑에 db["groups"]로 잘 간다
    })
    .catch((error) => {
      return reject(error)
    })

    const group = await db["groups"]
    .destroy(
      { // WHERE
        where: { group_id }
      },
    )
    .then((data) => {
      console.log(data)
      // 1
      if (data) return resolve()
      // 삭제할 그룹이 없는 경우(해당하는 group_id를 가진 group instance 없는 경우)
      else return reject()
    })
    .catch((error) => {
      console.log(error)
      return reject(error)
    })

  })
}

exports.getGroupBySearch = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요

    const { q } = req.body;
    db["groups"]
      .findAll({
        where: { 
          [op.or]: [  // https://sequelize.org/master/manual/model-querying-basics.html#applying-where-clauses
            { name: {
              [op.substring]: q
            }},
            { context: {
              [op.substring]: q
            }},
          ]
        }
      })
      .then((groups) => {
        console.log("This is getGroupBySearch groups:", groups)
        // 검색 조건에 맞는 그룹이 없는 경우
        if (!groups.length) {
          // 401 에러로 올릴 필요
          console.log("Group not found")
          return reject()
        }
        // 검색 조건에 맞는 그룹이 있는 경우
        return resolve(groups)
      })
      .catch((error) => {
        console.log("Unknown Error", error)
        return reject(error)
      })

  })
}