import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require(__dirname + '/../config/config.json')[env];

export const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {};

let modelsLoaded = false;

const createModels = (): any => {
  if (modelsLoaded) return models;

  fs.readdirSync(__dirname)
    .filter(
      (t) =>
        (~t.indexOf('.ts') || ~t.indexOf('.js')) && !~t.indexOf('index') && !~t.indexOf('.map'),
    )
    .forEach((file) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const model = require(path.join(__dirname, file))(sequelize, DataTypes);
      models[model.name] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });

  models['sequelize'] = sequelize;
  models['Sequelize'] = Sequelize;

  modelsLoaded = true;

  return models;
};

export default createModels();

export { createModels };
