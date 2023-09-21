module.exports = (sequelize, Sequelize) => {
  const varients = sequelize.define("varients", 
    {
      name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pizzaId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    }
  );
  return varients;
};