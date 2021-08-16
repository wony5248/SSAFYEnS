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
    if (!req.user_id) return reject("jwt must be provided to create group");
    // jwt 토큰으로 로그인한 회원 기준으로 로직

    let groupinfo = { ...req.body };

    // 그룹 생성 로직 시작
		db["groups"]
    .create(groupinfo)
    .then((group) => {

      console.log("This is createGroup group:", group.toJSON());
      db["users"]
      .findOne({ where: {user_id: req.user_id} }) // JWT
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
                user_id: req.user_id, // JWT
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
		// jwt 인증 확인 필요? 없는 것 같음

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
		// jwt 인증 확인 필요? 없는 것 같음

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
    if (!req.user_id) return reject("jwt must be provided");
    
    const { group_id } = req.params
    const { name, context } = req.body
    
    // jwt로 본인이 그룹관리자인 그룹을 수정하고 있는 것인지 확인 필요
    db["usersmngroups"]
    .findOne({where: {user_id: req.user_id, group_id}})
    .then((data) => {
      console.log("This is updateGroupById data:", data)
      if (!data || !data.is_group_admin) return reject("Group의 관리자만 수정할 수 있습니다");
      db["groups"]
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
    .catch((error) => {return reject(error)})
    
  })
}

exports.deleteGroupById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
    if (!req.user_id) return reject("jwt must be provided")

    const { group_id } = req.params
    console.log("This is deleteGroupById group_id: ", group_id)

    // jwt로 본인이 그룹관리자인 그룹을 삭제하고 있는 것인지 확인 필요
    db["usersmngroups"]
    .findOne({where: {user_id: req.user_id, group_id}})
    .then((data) => {
      console.log("This is updateGroupById data:", data)
      if (!data || !data.is_group_admin) return reject("Group의 관리자만 수정할 수 있습니다");
        
      // cascade로 usersmngroups에 group_id있는 것도 모두 삭제되었는지 확인 필요
      // foreignKey 오류발생(junction model 직접 선언시 CASCADE가 아닌 RESTRICT걸리는 것 같음)
      // 꼼수로 먼저 junction instance를 삭제하고 진행
      db["usersmngroups"]
      .destroy({
        where: { group_id }
      })
      .then((data) => {
        // 아무일도 없다 밑에 db["groups"]로 잘 간다
        db["groups"]
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
      .catch((error) => {
        return reject(error)
      })

    })
    .catch((err) => {return reject(err)})


  })
}

exports.getGroupBySearch = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요?

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


exports.getApplicants = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
    if (!req.user_id) return reject("jwt must be provided")
    // jwt를 통해 user_id 필요
    const user_id = req.user_id // jwt
    const group_id = req.params.group_id

    // user_id가 group_id의 그룹관리자인지 확인 필요
    db["usersmngroups"]
    .findOne({where: {group_id,user_id}})
    .then((data) => {
      console.log("This is getApplicants usersmngroups data:", data);
      if (!data) return reject("Group이 존재하지 않습니다./User가 Group의 회원이 아닙니다/존재하지 않는 user_id입니다");
      else if (!data.is_group_admin) return reject("Group Admin이 아닙니다.");
      // user_id가 group_id의 그룹관리자임을 확인함

      db["applicants"]
      .findAll({where: {group_id}})
      .then((applicants) => {
        console.log("This is getApplicants applicants:", applicants)
        // 가입신청자가 없어도 없는 상태(빈 array)로 200 코드 돌려준다.(정상)
        return resolve(applicants)
      })
      .catch((error) => {
        console.log(error)
        return reject(error)
      })

    })
    .catch((error) => {
      return reject(error)
    })

  })
}

exports.createApplicant = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
    if (!req.user_id) return reject("jwt must be provided")
    // jwt를 통해 user_id 필요
    const user_id = req.user_id // jwt
    const group_id = req.params.group_id
    let applicantinfo = { ...req.body, group_id, user_id }
    console.log(applicantinfo)

    // 이미 가입신청 승인되어 해당 그룹에 소속된 경우도 신청 못하게 막아야됨
    db["usersmngroups"]
    .findAll({where: {user_id, group_id}})
    .then((data) => {
      console.log("This is createApplicant data:",data)
      // 0개가 아닌 경우(이미 가입된 경우) 에러 반환
      if (data.length) return reject("이미 이 그룹 멤버잖아요");
      
      db["applicants"]
      .findAll({
        attributes: ['user_id', 'group_id'],
        where: {user_id, group_id}
      })
      .then((applicants) => {
        console.log("This is createApplicant applicants:",applicants)
        if (applicants.length) return reject("이미 가입신청했어요");
        // 중복 신청 아니라는 것 확인했으니 가입신청을 넣어줍니다.
        db["applicants"]
        .create(applicantinfo)
        .then((applicant) => {
          console.log("This is createApplicant applicant:",applicant)
          // 가입신청 완료!
          return resolve(applicant)
        })
        // 존재하지 않은 group_id면 에러!
        .catch((error) => {
          return reject(error)
        })

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

exports.deleteApplicant = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
    if (!req.user_id) return reject("jwt must be provided")
    // jwt를 통해 본인 것만을 지우도록 user_id 필요
    const user_id = req.user_id // jwt
    const group_id = req.params.group_id

    db["applicants"]
    .destroy({
      where: { group_id, user_id },
    })
    // where에 해당하는 모든 (2개 이상도 가능) applicants instance 삭제
    .then((data) => {
      console.log("This is deleteApplicant data:",data) // 0 또는 1 이상의 integer
      if (!data) return reject("Group이 존재하지 않음/해당 그룹에 가입신청한 적 없음/user_id가 존재하지 않음"); // 아무것도 삭제 안한 경우 에러
      return resolve()  // integer라 인자로 보낼 수 없음
    })
    // 존재하지 않은 group_id면 에러
    .catch((error) => {
      return reject(error)
    })
    
  })
}

exports.createMemberById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
    // jwt를 통해 user_id 필요
    const user_id = req.user_id // jwt
    const { group_id } = req.params
    const applicant_id = req.params.user_id
    
    // user_id가 group_id의 그룹관리자인지 확인 필요
    db["usersmngroups"]
    .findOne({where: { user_id, group_id}})
    .then((data) => {
      if (!data || !data.is_group_admin) return reject("그룹 관리자가 아닙니다")
      db["applicants"]
      .destroy({
        where: { group_id, user_id: applicant_id },
      })
      // where에 해당하는 모든 (2개 이상도 가능) applicants instance 삭제
      .then((data) => {
        console.log("This is createMemberById data:",data) // 0 또는 1 이상의 integer
        if (!data) return reject("Group이 존재하지 않음/해당 그룹에 가입신청한 적 없음/user_id가 존재하지 않음"); // 아무것도 삭제 안한 경우 에러
        // applicants 테이블에서 삭제하고 usersmngroups에 입력해야됨
        
        db["usersmngroups"]
        .create({group_id, user_id: applicant_id})
        .then((member) => {
          console.log("This is createMemberById member:",member)
          // group.pax 에 1명 추가 됐다고 더해줘야할 필요...?

          return resolve()
        })
        .catch((error) => {
          console.log(error)
          return reject(error)
        })
  
      })
      // 존재하지 않은 group_id면 에러
      .catch((error) => {
        return reject(error)
      })

    })
    .catch((err) => { return reject(err); })

    
  })
}

exports.deleteApplicantById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
    if (!req.user_id) return reject("jwt must be provided")
    // jwt를 통해 user_id 필요
    const user_id = req.user_id // jwt
    const { group_id } = req.params
    const applicant_id = req.params.user_id
    
    // user_id가 group_id의 그룹관리자인지 확인 필요
    db["usersmngroups"]
    .findOne({where: { user_id, group_id}})
    .then((data) => {
      if (!data || !data.is_group_admin) return reject("그룹 관리자가 아닙니다")
      // 신청기록 삭제
      db["applicants"]
      .destroy({
        where: { group_id, user_id: applicant_id },
      })
      // where에 해당하는 모든 (2개 이상도 가능) applicants instance 삭제
      .then((data) => {
        console.log("This is deleteApplicantById data:",data) // 0 또는 1 이상의 integer
        if (!data) return reject("Group이 존재하지 않음/해당 그룹에 가입신청한 적 없음/user_id가 존재하지 않음"); // 아무것도 삭제 안한 경우 에러
        // applicants 테이블에서 삭제
        return resolve()
      })
      // 존재하지 않은 group_id면 에러
      .catch((error) => {
        return reject(error)
      })

    })
    .catch((err) => { return reject(err)})

    
  })
}
