const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");

const config = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getDuplicateCheckById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요

    const { user_id } = req.params;
    db["users"]
      .findOne({
        where: { 
          user_id: user_id
        }
      })
      .then((data) => {
        console.log("This is getDuplicateCheckById data:", data)
        if (data == null) {
          // 못 찾은게 정상
          console.log("Id is available")
          return resolve(data)
        }
        // 찾은게 에러
        return reject()
      })
      .catch((error) => {
        console.log("Unknown Error", error)
        return reject(error)
      })
  })
}

exports.getDuplicateCheckByEmail = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요

    const { email } = req.params;
    db["users"]
      .findOne({
        where: { 
          email: email
        }
      })
      .then((data) => {
        console.log("This is getDuplicateCheckByEmail data:", data)
        if (data == null) {
          // 못 찾은게 정상
          console.log("email is available")
          return resolve(data)
        }
        // 찾은게 에러
        return reject()
      })
      .catch((error) => {
        console.log("Unknown Error", error)
        return reject(error)
      })
  })
}

exports.getDuplicateCheckByCellphone = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요

    const { cellphone } = req.params;
    db["users"]
      .findOne({
        where: { 
          cellphone: cellphone
        }
      })
      .then((data) => {
        console.log("This is getDuplicateCheckByCellphone data:", data)
        if (data == null) {
          // 못 찾은게 정상
          console.log("cellphone is available")
          return resolve(data)
        }
        // 찾은게 에러
        return reject()
      })
      .catch((error) => {
        console.log("Unknown Error", error)
        return reject(error)
      })
  })
}


exports.createUser = function (req) {
  return new Promise(async function (resolve, reject) {
    try {
      // console.log("This is createUser req.body:",req.body)
      // 비밀번호 암호화 과정
      let userinfo = { ...req.body, password: bcrypt.hashSync(req.body.password, 8) };
      // console.log("This is createUser userinfo:",userinfo)
      const data = await db["users"].create(userinfo)
      // 테스트 케이스 테스트
      // 1-1. 1개씩 - 하나씩만 보내면 컷
      // 1-2. 2개씩 - 두개씩만 보내면 컷
      // 아 너무 오래 걸림 아마 5개 다 안보내면 안될거임 암튼 안될거임
      // 
      // 2-1. 5개, 이메일 이미 존재 - 컷
      // 2-2. 5개, 전화번호 이미 존재 - 컷
      // 2-3. 5개, 유저_아이디 이미 존재 - 컷
      
      // 보낸 정보 + created_at 만 돌려줄지
      // 예전 코드처럼 openAPI로 돌려줄지(SQL 조회 1회 더 필요)
      return resolve(data);
    } catch (error) {
      // console.log("Number of occured errors:",error.errors.length);
      // for (e of error.errors) {
      //   console.log("Error Message:", e.message)
      // }
      return reject(error);
    }
  });
}

exports.findId = function (req) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log("This is findId req.query:",req.query)
      const where = {
        name: req.query.name,
        email: req.query.email,
      }
      const data = await db["users"].findAll({
        attributes: ['user_id'],
        where: where
      });
      if (!data.length) { // if no user
        console.log("No user found")
        return resolve({})
      }
      return resolve(data);
    } catch (error) {
      // 에러 발생할 일이 없음? required가 아니라서 그런가봄
      // console.log("Number of occured errors:",error.errors.length);
      // for (e of error.errors) {
      //   console.log("Error Message:", e.message)
      // }
      return resolve(error);
    }
  });
}

exports.validatePasswordRenew = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log("This is validatePasswordRenew req.query:",req.query)
      const where = {
        name: req.query.name,
        user_id: req.query.user_id,
        email: req.query.email,
      }
      const data = await db["users"].findOne({
        where: where
      });
      console.log("This is validatePasswordRenew data:",data)
      // 정보에 해당하는 회원이 없는 경우
      if (!data){
        // console.log(error)
        return reject(error)  // catch로 넘어가는 것으로 보임
      }
      return resolve(data);
    } catch (error) {
      // console.log("Number of occured errors:",error.errors.length);
      // for (e of error.errors) {
      //   console.log("Error Message:", e.message)
      // }
      return reject(error);
    }
  });
}

// where에 해당되지 않으면 error로 가도록 바꿔야함(현재는 [0] 결과를 돌려줌)
exports.updatePassword = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log("This is updatePassword req.body:",req.body)
      const where = {
        user_id: req.body.user_id,
      }
      // 기존 비밀번호와 똑같으면 못하게 막을까요??
      
      const data = await db["users"].update(
        {
          password: bcrypt.hashSync(req.body.password, 8),
        },
        {
          where: where
        }
      );
      // data에는 변경된 instance의 개수가 나타남
      // user_id가 정상이라면 [1]을(hash해서 무조건 바뀌게됨),
      // 존재하지 않는 user_id라면 [0]을 반환함
      console.log("This is updatePassword data:",data)
      if (data[0]){
        return resolve({result: 'Password has been updated'})
      } else {
        return reject({result: 'Incorrect user_id given'});
      }
    } catch (error) {
      // console.log("Number of occured errors:",error.errors.length);
      // for (e of error.errors) {
      //   console.log("Error Message:", e.message)
      // }
      return reject(error);
    }
  });
}
    
exports.login = function (req, res) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log("This is login req.body:",req.body)
      const user = await db["users"].findOne({
        where: {
          user_id: req.body.user_id,
        },
      })
      console.log("This is login user:",user)
      // 해당 user_id 없으면 에러
      if (user == null) {
        console.log("User not found")
        return reject(error)
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      console.log("This is login passwordIsValid:",passwordIsValid)
      // password 결과 안 맞으면 에러 내용 필요
      if (!passwordIsValid) {
        console.log("Password is not valid")
        return reject(error)
      };
      const token = jsonwebtoken.sign(
        { user_id: user.user_id },  // payload
        config.secret || 'secret',  // secretkey // config 작동 안하는 것으로 확인
        { expiresIn: config.expiresIn || 86400 }  // 유효기간 정함. 해당 시간이 넘으면 나중에 verify할 때 오류 발생
      );
      console.log("This is login token:",token)
      const data = {
        user_id: user.user_id,
        access_token: token,
      }
      console.log("This is login data:",data)
      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
}

// 

exports.logout = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // swagger에서 실험한 결과입니다
    console.log(req.headers["x-access-token"]) // undefined
    console.log(req.headers["access_token"])  // swagger 기준 실제 jwt 값 나옴
    const payload = jsonwebtoken.verify(
      req.headers["access_token"],
      config.secret || 'secret',
      (err, decoded) => { // https://www.npmjs.com/package/jsonwebtoken
        if (err) {
          console.log("[TEST]This is jwt err:",err)
          return reject(err)
        } else {
          console.log("[TEST]This is jwt decoded:",decoded)
          return resolve(decoded)
        }
      })
    // 이게 필요한가?? 컨설턴트님이 말씀하신 경우 아니라면 FE에서 storage 삭제할 일
    // 컨설턴트님 말한거처럼 whitelist 운영을 위해 남겨놓겠습니다...
  });
}

// openAPI 설계엔 없었지만 추가...
exports.getUserAll = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요

    db["users"]
      .findAll()
      .then((data) => {
        console.log("This is getUserAll data:", data)
        if (data == null) {
          // 401 에러로 올릴 필요
          console.log("No User")
          return reject(error)
        }
        return resolve(data)
      })
      .catch((error) => {
        console.log("Unknown Error", error)
        return reject(error)
      })
  })
}

exports.getUserById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요

    const { user_id } = req.params;
    db["users"]
      .findOne({
        where: { 
          user_id: user_id
        }
      })
      .then((data) => {
        console.log("This is getUserById data:", data)
        if (data == null) {
          // 401 에러로 올릴 필요
          console.log("User not found")
          return reject(error)
        }
        return resolve(data)
      })
      .catch((error) => {
        console.log("Unknown Error", error)
        return reject(error)
      })
  })
}

exports.updateUserById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
      // jwt로 본인 계정을 수정하고 있는 것인지 확인 필요
    
    const { user_id } = req.params
    // const body = req.body  // 왜인지 모르지만 이걸 통째로 UPDATE문에 넣으면 작동 안 한다
    const { name, email, cellphone, password, exp, created_at, is_admin} = req.body
    // console.log(name, email, cellphone, password, exp, created_at, is_admin)
    const user = await db["users"]
    .update(
      { // UPDATE
        name, email, cellphone, password, exp, created_at, is_admin
      },
      { // WHERE
        where: {
          user_id: user_id,
        }
      },
    )
    .then((data) => {
      db["users"].findOne({where: { user_id }})
      .then((data) => {
        console.log(data)
        return resolve(data)
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

// 작동하기는 하나, return resolve(data)로 index.js로 넘어갈때 JSON대신 integer만 가서 주의 표시 뜨며, FE에 error를 보냄
exports.deleteUserById = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    // jwt 인증 확인 필요
      // jwt로 본인 계정을 수정하고 있는 것인지 확인 필요
    
    const { user_id } = req.params
    console.log("This is deleteUserById user_id: ", user_id)
    const user = await db["users"]
    .destroy(
      { // WHERE
        where: {
          user_id: user_id,
        }
      },
    )
    .then((data) => {
      console.log(data)
      // 1
      return resolve(data)
    })
    .catch((error) => {
      console.log(error)
      return reject(error)
    })
  })
}