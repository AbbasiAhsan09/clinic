import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { clinicProvider } from './clinic.provider';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/jwt-config-module/jwt-config-module.module';
import { JwtConfigService } from 'src/jwt-config-module/jwt.service';

@Module({
  imports :[UserModule,JwtConfigModule],
  controllers: [ClinicController],
  providers: [ClinicService, ...clinicProvider]
})
export class ClinicModule {}
