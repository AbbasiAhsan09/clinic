import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Cities, Countries, States } from './entities/location.entity';
import { AppCommonService } from 'src/shared/common.service';

@Injectable()
export class LocationService {
  constructor(
    @Inject('CountriesRepo') private readonly countriesRepo : typeof Countries,
    @Inject('StatesRepo') private readonly statesRepo : typeof States,
    @Inject('CitiesRepo') private readonly citiesRepo : typeof Cities,
    private readonly commonService : AppCommonService
  ){}
  async getAllCountries(){
    try {
      return await this.countriesRepo.findAll();
    } catch (err) {
      throw new Error(err);
    }
  }

  async getStatesByCountryId(countryId : number){
    try {
      return await this.statesRepo.findAll({where : {countryId : countryId}});
    } catch (err) {
      throw new Error(err)
    }
  }

  async getCitiesByStateId(countryId : number){
    try {
      return await this.citiesRepo.findAll({where : {stateId : countryId}});
    } catch (err) {
      throw new Error(err)
    }
  }

  async feedDataFromJson(){
    try {
      const data = await this.commonService.extractJsonFile('location.json');
      if(data?.length ){
        for(const country of data){
            const countryInserted = await this.countriesRepo.create({name : country?.name, code : country?.iso2});
            if(country?.states){
              for(const state of country?.states){
                const insertedState = await this.statesRepo.create({countryId : countryInserted?.id,name : state?.name, code : state?.state_code});
                if(state?.cities){
                  for(const city of state?.cities){
                    await this.citiesRepo.create({stateId : insertedState?.id , countryId : countryInserted?.id,name : city?.name, code : 'citycode' });
                  }
                }
              }
            }
        }
      }
      return data;
    } catch (err) {
      throw new Error(err)
    }
  }
}
