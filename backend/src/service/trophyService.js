const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");

const config = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

exports.createTrophy = function (req) {
  return new Promise(async function (resolve, reject) {
    // 관리자인지 확인하는 과정 필요

    db["trophies"]
    .create(req.body)
    .then((data) => { return resolve(data); })
    .catch((err) => { return reject(err); })
  });
}

exports.getTrophyAll = function (req) {
  return new Promise(async function (resolve, reject) {
    // user_id를 필요로 하지 않을 것 같습니다.

    db["trophies"]
    .findAll()
    .then((data) => { return resolve(data); })
    .catch((err) => { return reject(err); })
  });
}

exports.getUserTrophyAll = function (req) {
  return new Promise(async function (resolve, reject) {
    // user_id를 필요로 하지 않을 것 같습니다.

    db["usersmntrophies"]
    .findAll()
    .then((data) => { return resolve(data); })
    .catch((err) => { return reject(err); })
  });
}

exports.getUserTrophiesById = function (req) {
  return new Promise(async function (resolve, reject) {
    const { user_id } = req.params
    
    db["users"]
    .findOne({where: { user_id }})
    .then((user) => { 
      user.getTrophies()
      .then((data) => { 
        // console.log("This is getUSerTrophiesById user.getTrophies() data:",data)
        spread_data = data.map(datum => {  
          const { trophy_id, title, context, is_hidden, exp, img, created_at, updated_at, usersmntrophies } = datum;
          // console.log({ trophy_id, title, context, is_hidden, exp, img, created_at, updated_at, trophy_id: usersmntrophies.trophy_id, user_id: usersmntrophies.user_id, achieved_at: usersmntrophies.achieved_at })
          return { trophy_id, title, context, is_hidden, exp, img, created_at, updated_at, trophy_id: usersmntrophies.trophy_id, user_id: usersmntrophies.user_id, achieved_at: usersmntrophies.achieved_at }
        })
        return resolve(spread_data); 
      })
      .catch((err) => { return reject(err); })
    })
    .catch((err) => { return reject(err); })

    // 단순히 usersmntrophies에서 user_id해당되는것만 가져오는 코드
    // db["usersmntrophies"]
    // .findAll({where: {user_id}})
    // .then((data) => { return resolve(data); })
    // .catch((err) => { return reject(err); })
  });
}

exports.createUserTrophyById = function (req) {
  return new Promise(async function (resolve, reject) {
    const { user_id, trophy_id } = req.params

    // 이미 얻은 트로피를 중복으로 얻는 것을 방지해야한다.
    db["usersmntrophies"]
    .findAll({where: {user_id, trophy_id}})
    .then((data) => { 
      if (data.length) {
        console.log("이미 해당 유저는 해당 트로피를 보유하고 있습니다. ")
        return resolve()
      } else {
        db["usersmntrophies"]
        .create(req.params)
        .then((data) => { 
          // 로직상 중복 방지도 가능하지만, DB에서 미연에 방지할 수 있다.
          // https://stackoverflow.com/questions/53281798/avoid-duplicates-in-sequelize-query
          // 위에 링크처럼 unique: "compositeIndex"는 작동하지 않았다.
          // unique: true는 작동하지만 2개 중 하나를 PRI, 나머지는 UNI로 하여 PRI가 된 것의 중복을 막아 복합키로는 작동하지 않는다.
          // SQL(DB)에 primary key를 2개 이상 적용시키니 PRI 2개로 적용되며 복합키로 작동한다.
    
          return resolve(data); 
        })
        .catch((err) => { 
          // 유효하지 않은 user_id, trophy_id는 컷
          return reject(err);
        })
      }
    })
    .catch((err) => { return reject(err);})


  });
}
