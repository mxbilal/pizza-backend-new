module.exports = (sequelize, Sequelize) => {
  const adminUsers = sequelize.define(
    'admins',
    {
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adminType: {
        type: Sequelize.ENUM("super_admin", "admin"),
        defaultValue: "admin"
      },
      superAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      twoFactorEnabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    },
    {
      indexes: [
        // Create a unique index on email
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );
  return adminUsers
}
