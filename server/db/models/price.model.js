let db = require('./_db.js'),
    Sequelize = require('sequelize');

module.exports =  db.define('price', {
    item:{
      type:Sequelize.STRING

    },
    date:{
      type:Sequelize.STRING

    },
    value:{
      type:Sequelize.DECIMAL

    }
})
