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
        user_id: 'jbj',
        name: '장범진',
        email: 'jbj@jbj.com',
        cellphone: '010-0000-0000',
        password: '$321!pass!123$',
        created_at: new Date(),
      },
      {
        user_id: 'admin',
        name: '관리자',
        email: 'admin@admin.com',
        cellphone: '000-0000-0000',
        password: '$321!pass!123$',
        created_at: new Date(),
        // is_admin: true // if used, all other instances' is_admin become NULL
      },
      {
        user_id: 'rlathdgus',
        name: '김송현',
        email: 'thdgus@rla.com',
        cellphone: '010-1234-1234',
        password: '$321!pass!123$',
        created_at: new Date(),
      },
      {
        user_id: 'dltkdgus',
        name: '이상현',
        email: 'tkdgus@dl.com',
        cellphone: '010-0000-0001',
        password: '$321!pass!123$',
        created_at: new Date(),
      },
      {
        user_id: 'wkdwnqls',
        name: '장주빈',
        email: 'wnqls@wkd.com',
        cellphone: '010-0000-0002',
        password: '$321!pass!123$',
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
