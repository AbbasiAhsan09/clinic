import axios from '../utils/axios-config';
export const LocationService =  {
    async getAllCountries(){
        try {
            return await axios.get('/location/countries');
        } catch (err) {
            throw err;
        }
    },
    async getStatesByCountryId(countryId : number){
        try {
            return await axios.get(`location/states/${countryId}`);
        } catch (err) {
            throw err;
        }
    },
    async getCitiesByStateId(stateId : number){
        try {
            return await axios.get(`location/cities/${stateId}`);
        } catch (err) {
            throw err;
        }
    }
}