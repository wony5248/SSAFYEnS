const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");

const config = require("../config/config.js");
const jsonwebtoken = require("jsonwebtoken");

exports.getAllChallenge = function (req) {
  return new Promise(async function (resolve, reject) {

    db["challenges"]
    .findAll()
    .then((data) => { return resolve(data); })
    .catch((err) => { return reject(err); })
  });
}

exports.createChallenge = function (req) {
  return new Promise(async function (resolve, reject) {
    
    db["challenges"]
    .create(req.body)
    .then((data) => { return resolve(data); })
    .catch((err) => { return reject(err); })
  });
}

exports.getChallengeById = function (req) {
  return new Promise(async function (resolve, reject) {
    const { challenge_id } = req.params

    db["challenges"]
    .findOne({where: {challenge_id}})
    .then((challenge) => { 
      challenge.getSchedules()
      .then((schedules) => { 
        let challengeJSON = { ...challenge.toJSON() , schedules }
        return resolve(challengeJSON); 
      })
      .catch((err) => { return reject(err);})
    })
    .catch((err) => { return reject(err); })
  });
}

exports.createChallengeScheduleFK = function (req) {
  return new Promise(async function (resolve, reject) {
    const { challenge_id, schedule_id } = req.params

    db["schedules"]
    .update(
      { challenge_id },
      {where: { schedule_id }},
    )
    .then((data) => { return resolve(data); })
    .catch((err) => { return reject(err); })
  });
}

