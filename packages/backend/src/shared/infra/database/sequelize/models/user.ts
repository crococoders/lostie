import { Model } from 'sequelize';
// import { Currency } from '../enums/currency';

module.exports = (sequelize, DataTypes): any => {
  class User extends Model {
    static associate(models): void {
      User.hasMany(models.Document, { foreignKey: 'founderId' });
      User.hasMany(models.Document, { foreignKey: 'seekerId' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      tableName: 'user',
    },
  );

  return User;
};
