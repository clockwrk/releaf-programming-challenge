let Sequelize = require('sequelize'),
    path = require('path'),
    env = require(path.join(__dirname, '../../env')),
    db = new Sequelize(env.DATABASE_URL, {
        logging: false
    });

module.exports = db;
