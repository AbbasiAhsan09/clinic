import { Cities, Countries, States } from "./entities/location.entity";

export const locationProvider = [
    {provide : 'CountriesRepo' , useValue : Countries},
    {provide : 'StatesRepo' , useValue : States},
    {provide : 'CitiesRepo' , useValue : Cities},
 ]
