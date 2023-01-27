import { Model } from 'sequelize';
import { DocumentStatus, DocumentType } from '../enums/document';

module.exports = (sequelize, DataTypes): any => {
  class Document extends Model {
    static associate(models): void {
      Document.belongsTo(models.User, {
        foreignKey: 'founderId',
      });
      Document.belongsTo(models.User, {
        foreignKey: 'seekerId',
      });
      Document.hasOne(models.DriverLicense, {
        foreignKey: {
          allowNull: true,
        },
      });
      Document.hasOne(models.Passport, {
        foreignKey: {
          allowNull: true,
        },
      });
      Document.hasOne(models.NationalID, {
        foreignKey: {
          allowNull: true,
        },
      });
      Document.hasOne(models.BankCard, {
        foreignKey: {
          allowNull: true,
        },
      });
    }
  }
  Document.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      contactDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      reward: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          DocumentStatus.LOST,
          DocumentStatus.FOUND,
          DocumentStatus.MATCHED,
          DocumentStatus.RECEIVED,
        ],
      },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          DocumentType.PASSPORT,
          DocumentType.DRIVER_LICENSE,
          DocumentType.NATIONAL_ID,
          DocumentType.BANK_CARD,
        ],
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Document',
      timestamps: true,
      tableName: 'document',
    },
  );

  return Document;
};
