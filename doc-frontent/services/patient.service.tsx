import { IPatient } from "@/interfaces/common"
import axios  from '../utils/axios-config';
export const PatientService = {
    async create(patient:IPatient){
        try {
            return await axios.post(`/patients`,patient);
        } catch (err) {
            throw err;
        }
    },
    async getAll(){
        try {
            return await axios.get<IPatient[]>('/patients');
        } catch (err) {
            throw err;
        }
    },
    async edit(patient:IPatient){
        return await axios.patch<IPatient>(`/patients/${patient?.id}`,patient);
    }
}