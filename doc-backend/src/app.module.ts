import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModuleModule } from './database-module/database-module.module';
import { UserModule } from './user/user.module';
import { ClinicModule } from './clinic/clinic.module';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigModule } from './jwt-config-module/jwt-config-module.module';
import { LocationModule } from './location/location.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [DatabaseModuleModule, UserModule, ClinicModule,
  ConfigModule.forRoot({
    envFilePath : ['.env','.dev.env'],
    isGlobal : true
  }),
  JwtConfigModule,
  LocationModule,
  PatientsModule],
  controllers: [AppController],
  providers: [AppService],
  exports : []
})
export class AppModule {}
