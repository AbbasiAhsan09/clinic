import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { locationProvider } from './location.provider';
import { AppCommonService } from 'src/shared/common.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, ...locationProvider,AppCommonService]
})
export class LocationModule {}
