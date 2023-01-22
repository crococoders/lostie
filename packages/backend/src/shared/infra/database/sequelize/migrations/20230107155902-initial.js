'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const CREATE_USER_TABLE = () => {
      return queryInterface.createTable('user', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      });
    };

    const CREATE_DOCUMENT_TABLE = () => {
      return queryInterface.createTable('document', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        founderId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        },
        seekerId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'user',
            key: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        },
        contactDetails: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        reward: {
          type: Sequelize.DECIMAL(15, 2),
          allowNull: true,
        },
        status: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['lost', 'found', 'matched', 'received'],
        },
        type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ['passport', 'driver_license', 'national_id', 'bank_card'],
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });
    };

    const CREATE_PASSPORT_TABLE = () => {
      return queryInterface.createTable('passport', {
        documentId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'document',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'no action',
        },
        dateOfBirth: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        number: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        uin: {
          type: Sequelize.DECIMAL(12, 0),
          allowNull: true,
        },
      });
    };

    const CREATE_NATIONAL_ID_TABLE = () => {
      return queryInterface.createTable('national_id', {
        documentId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'document',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'no action',
        },
        dateOfBirth: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        number: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        uin: {
          type: Sequelize.DECIMAL(12, 0),
          allowNull: true,
        },
      });
    };

    const CREATE_BANK_CARD_TABLE = () => {
      return queryInterface.createTable('bank_card', {
        documentId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'document',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'no action',
        },
        firstName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        lastFourDigits: {
          type: Sequelize.DECIMAL(4, 0),
          allowNull: true,
        },
      });
    };

    const CREATE_DRIVER_LICENSE_TABLE = () => {
      return queryInterface.createTable('driver_license', {
        documentId: {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
            model: 'document',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'no action',
        },
        dateOfBirth: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        uin: {
          type: Sequelize.DECIMAL(12, 0),
          allowNull: true,
        },
      });
    };

    await CREATE_USER_TABLE();
    await CREATE_DOCUMENT_TABLE();
    await CREATE_PASSPORT_TABLE();
    await CREATE_NATIONAL_ID_TABLE();
    await CREATE_BANK_CARD_TABLE();
    await CREATE_DRIVER_LICENSE_TABLE();
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user');
    await queryInterface.dropTable('document');
    await queryInterface.dropTable('passport');
    await queryInterface.dropTable('national_id');
    await queryInterface.dropTable('bank_card');
    await queryInterface.dropTable('driver_license');
  },
};
