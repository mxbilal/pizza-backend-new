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
db.categories = require("./category")(sequelizeInstance, Sequelize);
db.products = require("./products")(sequelizeInstance, Sequelize);
db.varients = require("./varients")(sequelizeInstance, Sequelize);
db.images = require("./images")(sequelizeInstance, Sequelize);
/************************ *********************/
db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

/********* relations ************************/
db.categories.hasMany(db.products, { foreignKey: "categoryId" });
db.products.belongsTo(db.categories)

db.products.hasMany(db.varients, { foreignKey: "productId" });
db.varients.belongsTo(db.products)


db.varients.hasMany(db.images, {foreignKey: "varientId"});
db.images.belongsTo(db.varients)

/****************************************** */
module.exports = db;
