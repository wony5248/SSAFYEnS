const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");

const config = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.createUser = function (req) {
  return new Promise(async function (resolve, reject) {
    try {
      // console.log("This is createUser req.body:",req.body)
      // 비밀번호 암호화 과정
      let userinfo = { ...req.body, password: bcrypt.hashSync(req.body.password, 8) };
      // console.log("This is createUser userinfo:",userinfo)
      const createdUser = await db["users"].create(userinfo)
      /**{
            "user_id": "honggildong4!",
            "name": "홍길동1!",
            "email": "hong@korea2.kr",
            "cellphone": "010-1234-5676",
            "password": "$2b$08$Sov7P5Rvor6DNcQLynmo1.Gy5btB/wjCzT6Pb0teoY4EvDFxQ1M32",
            "updated_at": "2021-08-03T05:02:35.597Z"
          }
       */
      const data = await db["users"].findOne({
        where: {
          user_id: userinfo.user_id,
        }
      })
      /**{
            "user_id": "honggildong6!",
            "name": "홍길동1!",
            "email": "hong@korea6.kr",
            "cellphone": "010-127354-5676",
            "password": "$2b$08$Sov7P5Rvor6DNcQLynmo1.Gy5btB/wjCzT6Pb0teoY4EvDFxQ1M32",
            "exp": 0,
            "is_admin": false,
            "created_at": "2021-08-03T05:06:02.000Z"
        } */
      resolve(data);
    } catch (error) {
      reject(error);
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
      const data = await db["users"].findOne({
        attributes: ['user_id'],
        where: where
      });
      resolve(data);
    } catch (error) {
      resolve(error);
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
      const result = await db["users"].findOne({
        where: where
      });
      console.log("This is validatePasswordRenew result:",result)
      // 결과를 어떻게 전달할지 미정
      // result: { ... }
      // result: null

      resolve(data);
    } catch (error) {
      resolve(error);
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
      const data = await db["users"].update(
        {
          password: bcrypt.hashSync(req.body.password, 8),
        },
        {
          where: where
        });
        /**
         [
           1 // 변경된 instance 갯수로 보임
          ]
          */
         resolve(data);
        } catch (error) {
          resolve(error);
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
        reject()
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )
      console.log("This is login passwordIsValid:",passwordIsValid)
      // password 결과 안 맞으면 에러 내용 필요
      if (!passwordIsValid) {
        console.log("Password is not valid")
        reject()
      };
      const token = jsonwebtoken.sign(
        { user_id: user.user_id },  // payload
        config.secret || 'secret',  // secretkey // config 작동 안하는 것으로 확인
        { expiresIn: config.expiresIn || 86400 }
      );
      console.log("This is login token:",token)
      const data = {
        user_id: user.user_id,
        access_token: token,
      }
      console.log("This is login data:",data)
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
}

exports.logout = function (req, res, next) {
  return new Promise(async function (resolve, reject) {
    console.log(req.headers["x-access-token"]) // undefined
    console.log(req.headers["access_token"])  // swagger 기준 실제 jwt 값 나옴
    // 이게 필요한가?? 컨설턴트님이 말씀하신 경우 아니라면 FE에서 storage 삭제할 일
  });
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
          reject()
        }
        resolve(data)
      })
      .catch((error) => {
        console.log("Unknown Error", error)
        reject()
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
        resolve(data)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })

  })
}

// 작동하기는 하나, resolve(data)로 index.js로 넘어갈때 JSON대신 integer만 가서 주의 표시 뜨며, FE에 error를 보냄
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
      resolve(data)
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}