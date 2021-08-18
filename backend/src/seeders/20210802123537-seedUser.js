'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
        user_id: "1",
        name: "1",
        email: "1",
        cellphone: "1",
        password: "$2b$08$/X2tFwSotntltTKcK7aPnO.TA.seRv7a/DTy.HtU4dvuUR4y0ECZy",
        created_at: new Date(),
      },
      {
        user_id: "2",
        name: "2",
        email: "2",
        cellphone: "2",
        password: "$2b$08$Lvyt7mAhJT2YcI2GUffU0eL1bYBuebb9Y6O18d8XqJTQgG2S7cUwu",
        created_at: new Date(),
      },
      {
        user_id: "3",
        name: "3",
        email: "3",
        cellphone: "3",
        password: "$2b$08$jJAuY80A2aLcx1uG6ChEpuzUoU/b6c1QvoNgX7qgmZEzBIwOr3pEW",
        created_at: new Date(),
      },
      {
        user_id: "4",
        name: "4",
        email: "4",
        cellphone: "4",
        password: "$2b$08$R5EG4JuoZNtM4PmfmlZpl.32XS7znvmcse0RLJYQ/SGkMyMDf034q",
        created_at: new Date(),
      },
      {
        user_id: 'test1',
        name: 'test1',
        email: 'test1',
        cellphone: 'test1',
        password: '$2b$08$PT.UcLJHZT7QdpMmjv7LM.iSkfNyyM6buywobtXqyzNjbsDQGRcB.',
        created_at: new Date(),
      },
      {
        user_id: 'test2',
        name: 'test2',
        email: 'test2',
        cellphone: 'test2',
        password: '$2b$08$OvuYgfhzjcqVMNyqOw/o0eAP/ZYuWCtaCM4XAho00aR0Kpw3VYfIm',
        created_at: new Date(),
      },
      {
        user_id: 'test3',
        name: 'test3',
        email: 'test3',
        cellphone: 'test3',
        password: '$2b$08$MJ95e9LkQNJ/qkTIf33.J.Pi2WuWCorHKtIc7mQUlSkqH6p0O0YUa',
        created_at: new Date(),
      },
      {
        user_id: 'samename1',
        name: 'samename',
        email: 'samename1',
        cellphone: 'samename1',
        password: '$2b$08$IaY8xpVd5SpnczqtgsLg4OTrRcUy11vVcXsNg9vtBpyWqwPpXPk6a',
        created_at: new Date(),
      },
      {
        user_id: 'samename2',
        name: 'samename',
        email: 'samename2',
        cellphone: 'samename2',
        password: '$2b$08$BiX8j/GDTLRFITZO9W/93uesz4U0zHtoekRwM7d2vQqP9o9HibPim',
        created_at: new Date(),
      },
      {
        user_id: 'samename3',
        name: 'samename',
        email: 'samename3',
        cellphone: 'samename3',
        password: '$2b$08$2v8fJEKlR6VtbY8/2Qsjm.TfikTDhpRwNmMqgUu3HT3ARCGEFn6Am',
        created_at: new Date(),
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
