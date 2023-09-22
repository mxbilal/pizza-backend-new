module.exports = (sequelize, Sequelize) => {
  const varients = sequelize.define("varients", 
    {
      type: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      prize: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    }
  );
  return varients;
};