let db = require('./_db.js'),
    Sequelize = require('sequelize');

module.exports =  db.define('consumption', {
  state:{
    type:Sequelize.STRING

  },
  item:{
    type:Sequelize.STRING

  },
  value:{
    type:Sequelize.DECIMAL

  }

})
