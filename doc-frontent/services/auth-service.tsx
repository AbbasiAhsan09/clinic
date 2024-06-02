import { IClinic } from '@/interfaces/common';
import { ILogin } from '@/interfaces/common';
import axios from '../utils/axios-config';
export const AuthService =  {
    async createAccount(account:IClinic){
        try {
            return await axios.post('/clinic',account);
        } catch (err) {
            throw err;
        }
    },
    async loginAccount(credentials : ILogin){
        try {
            return await axios.post('/user/login',credentials);
        } catch (err) {
            throw err;
        }
    }
}