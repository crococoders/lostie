import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes): any => {
  class NationalID extends Model {
    static associate(models): void {
      NationalID.belongsTo(models.Document, {
        foreignKey: 'documentId',
      });
    }
  }
  NationalID.init(
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
      number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      uin: {
        type: DataTypes.DECIMAL(12, 0),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'NationalID',
      timestamps: true,
      tableName: 'nationalID',
    },
  );

  return NationalID;
};
