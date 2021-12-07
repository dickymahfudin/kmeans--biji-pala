'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('palas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      kondisi: {
        type: Sequelize.INTEGER,
      },
      bunyi: {
        type: Sequelize.INTEGER,
      },
      serangga: {
        type: Sequelize.INTEGER,
      },
      jamur: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    const data = [
      {
        name: 'P1',
        kondisi: 1,
        bunyi: 1,
        serangga: 1,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P2',
        kondisi: 2,
        bunyi: 2,
        serangga: 2,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P3',
        kondisi: 2,
        bunyi: 2,
        serangga: 2,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P4',
        kondisi: 1,
        bunyi: 1,
        serangga: 1,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P5',
        kondisi: 2,
        bunyi: 2,
        serangga: 1,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P6',
        kondisi: 3,
        bunyi: 1,
        serangga: 1,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P7',
        kondisi: 1,
        bunyi: 1,
        serangga: 1,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P8',
        kondisi: 3,
        bunyi: 3,
        serangga: 2,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P9',
        kondisi: 2,
        bunyi: 2,
        serangga: 1,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'P10',
        kondisi: 1,
        bunyi: 1,
        serangga: 1,
        jamur: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('palas', data);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('palas');
  },
};
