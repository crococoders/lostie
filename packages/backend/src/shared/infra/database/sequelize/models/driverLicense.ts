import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes): any => {
  class DriverLicense extends Model {
    static associate(models): void {
      DriverLicense.belongsTo(models.Document, {
        foreignKey: 'documentId',
      });
    }
  }
  DriverLicense.init(
    {
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      uin: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'DriverLicense',
      timestamps: true,
      tableName: 'driverLicense',
    },
  );

  return DriverLicense;
};
