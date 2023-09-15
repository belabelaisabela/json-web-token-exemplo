'use strict';
const crypto = require('../servidor/crypto');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      { nome: 'John Doe', senha: '123' },
      { nome: 'Picolo', senha: '123' },
      { nome: 'Picolo', senha: crypto.encrypt('123')}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
