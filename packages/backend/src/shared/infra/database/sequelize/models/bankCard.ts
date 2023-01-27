import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes): any => {
  class BankCard extends Model {
    static associate(models): void {
      BankCard.belongsTo(models.Document, {
        foreignKey: 'documentId',
      });
    }
  }
  BankCard.init(
    {
      firstName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      lastFourDigits: {
        type: DataTypes.DECIMAL(4, 0),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'BankCard',
      timestamps: true,
      tableName: 'bankCard',
    },
  );

  return BankCard;
};
