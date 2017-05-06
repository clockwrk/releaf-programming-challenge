let db = require('./_db.js'),
    Sequelize = require('sequelize');

module.exports =  db.define('productionPattern', {
  state: {
    type:Sequelize.STRING
  },
  item: {
    type:Sequelize.STRING
  },
  indicator:{
    type:Sequelize.STRING
  },
  value: {
    type:Sequelize.STRING
  },
  date: {
    type:Sequelize.STRING
  }
})
