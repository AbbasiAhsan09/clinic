import { Controller, Get,  Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Locations")
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {} 
  @Get('countries')
  async getAllCountries() {
    return await this.locationService.getAllCountries();
  }
  @Get("states/:countryId")
  async getStatesByCountry(@Param("countryId") countryId : number | string){
    return await this.locationService.getStatesByCountryId(+countryId);
  }
  @Get("cities/:stateId")
  async getCitiesByCountry(@Param("stateId") stateId : number | string){
    return await this.locationService.getCitiesByStateId(+stateId);
  }

  @Get('extractData')
  async extractData(){
    return await this.locationService.feedDataFromJson();
  }
}
