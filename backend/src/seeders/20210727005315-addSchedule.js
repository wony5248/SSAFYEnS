const moment = require("moment");

("use strict");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let now = moment();
    let now2 = moment().add(7, "days");
    let now3 = moment().add(1, "months");
    let prev = now.clone().subtract(3, "days");
    return queryInterface.bulkInsert(
      "schedules",
      [
        {
          user_id: "jbj",
          date: now.clone().toDate(),
          title: "코딩하기",
          context: "코딩할꾸야",
          started_at: now.clone().subtract(5, "days").toDate(),
          finished_at: now.clone().add(5, "days").toDate(),
          deadline_at: now.clone().add(15, "days").toDate(),
          point: 30,
          is_finished: false,
          notification: now.clone().add(2, "days").toDate(),
          noti_extend: 0,
          challenge_id: null,
        },
        {
          user_id: "jbj",
          date: now2.clone().toDate(),
          title: "자격증공부하기",
          context: "자격증 딸구야",
          started_at: now2.clone().subtract(5, "days").toDate(),
          finished_at: now2.clone().add(5, "days").toDate(),
          deadline_at: now2.clone().add(15, "days").toDate(),
          point: 30,
          is_finished: false,
          notification: now2.clone().add(2, "days").toDate(),
          noti_extend: 0,
          challenge_id: null,
        },
        {
          user_id: "jbj",
          date: now3.clone().toDate(),
          title: "머리깎기",
          context: "머리깎을꾸야",
          started_at: now3.clone().add(6, "days").toDate(),
          finished_at: now3.clone().add(6, "days").toDate(),
          deadline_at: now3.clone().add(6, "days").toDate(),

          point: 30,
          is_finished: false,
          notification: now3.clone().add(2, "days").toDate(),
          noti_extend: 0,
          challenge_id: null,
        },
        {
          user_id: "jbj",
          date: prev.clone().toDate(),
          title: "이전 일정",
          context: "이전 일정",
          started_at: prev.clone().toDate(),
          finished_at: prev.clone().toDate(),
          deadline_at: prev.clone().toDate(),

          point: 30,
          is_finished: true,
          notification: prev.clone().toDate(),
          noti_extend: 0,
          challenge_id: null,
        },
      ],
      {}
    );
    // schedule_id: {
    // },
    // user_id: {

    // },
    // date: {  },
    // title: { },
    // context: { },
    // started_at: { },
    // finished_at: { },
    // deadline_at: { },
    // point: { },
    // is_finixhed: { },
    // notification: { },
    // noti_extend: { },
    // challenge_id: { },
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("schedules", null, {});
  },
};
