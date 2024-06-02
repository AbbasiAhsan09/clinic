import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { patientProvider } from './patient.provider';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService,...patientProvider]
})
export class PatientsModule {}
