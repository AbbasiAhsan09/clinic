import { Sequelize } from 'sequelize-typescript';
import sequelizeConfig = require("../config/sequelize.config")
import { User } from 'src/user/entities/user.entity';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { Cities, Countries, States } from 'src/location/entities/location.entity';
import { Patient } from 'src/patients/entities/patient.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(sequelizeConfig);
      sequelize.addModels([User,Clinic, Countries, States, Cities, Patient]);
      await sequelize.sync();
      return sequelize;
    },
  },
];