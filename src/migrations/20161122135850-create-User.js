'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.createTable('User', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },

        firstName: {
          type: Sequelize.STRING
        },

        lastName: {
          type: Sequelize.STRING
        },

        gender: {
          type:Sequelize.STRING,
        },

        phone:{
          type:Sequelize.STRING,
          unique:true
        },

        profilePictureUrl: {
          type: Sequelize.STRING
        },

        birthday: {
          type: Sequelize.DATEONLY
        },

        centerID: {
          type: Sequelize.INTEGER,
          defaultValue: null
        },

        facebookUserID:{
          unique:true,
          type: Sequelize.STRING
        },

        facebookAccessToken: {
          type: Sequelize.STRING
        },

        email:{
          type:Sequelize.STRING,
          unique:true,
          allowNull:false
        },
        isEmailVerified: {
          type: Sequelize.BOOLEAN
        },
        isPhoneVerified:{ 
          type: Sequelize.BOOLEAN
        },
        version: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },

        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now')
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('now')
        },
        deletedAt:{
          type:Sequelize.DATE,
          defaultValue:null
        }
      });
  },

  down: function (queryInterface, Sequelize) {

      return queryInterface.dropTable('User');
  }
};
