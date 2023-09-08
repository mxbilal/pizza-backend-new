const databaseConfig = require("../config/database");
const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  port: 3306,
  dialect: databaseConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: databaseConfig.pool.max,
    min: databaseConfig.pool.min,
    acquire: databaseConfig.pool.acquire,
    idle: databaseConfig.pool.idle
  }
});
const db = {};

db.users = require("./user")(sequelizeInstance, Sequelize);
db.admins = require("./admin")(sequelizeInstance, Sequelize);

/************************ *********************/
db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;


/****************************************** */
module.exports = db;
